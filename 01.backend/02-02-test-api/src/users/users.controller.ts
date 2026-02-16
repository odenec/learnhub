import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http.error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import type { ILoger } from '../logger/loger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-registr.dto';
import { User } from './user.entity';
import type { IUsersServise } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.midleware';
import { UserLoginDto } from './dto/user-login.dto';
@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILoger) private loggerService: ILoger,
		@inject(TYPES.UserService) private userService: IUsersServise,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				midlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				midlewares: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}
	async login(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, 'ошибка аторизации', 'context'));
		}
		this.ok(res, {});
	}
	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(
				new HTTPError(422, 'Такой пользователь уже существует', 'user'),
			);
		}

		this.ok(res, { email: result.email, id: result.id });
	}
}
