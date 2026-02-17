import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http.error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import type { ILoger } from '../logger/loger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-registr.dto';
import type { IUsersServise } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.midleware';
import { UserLoginDto } from './dto/user-login.dto';
import { sign } from 'jsonwebtoken';
import type { IConfigService } from 'src/config/config.service.interface';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILoger) private loggerService: ILoger,
		@inject(TYPES.UserService) private userService: IUsersServise,
		@inject(TYPES.ConfigService) private configeService: IConfigService,
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
			{
				path: '/info',
				method: 'get',
				func: this.info,
				midlewares: [],
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
		const jwt = await this.signJWT(
			body.email,
			this.configeService.get('SECRET'),
		);
		this.ok(res, { jwt });
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
	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: req.user });
	}
	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					} else {
						resolve(token as string);
					}
				},
			);
		});
	}
}
