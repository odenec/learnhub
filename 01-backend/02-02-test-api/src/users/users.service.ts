import { inject, injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-registr.dto';
import { User } from './user.entity';
import { IUsersServise } from './users.service.interface';
import type { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import type { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login.dto';

@injectable()
export class UserServise implements IUsersServise {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get<number>('SALT');
		await newUser.setPassword(password, salt);
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}
	async validateUser({
		email,
		username,
		password,
	}: UserLoginDto): Promise<boolean> {
		const identifier = email || username;
		if (!identifier) return false;
		const existedUser = await this.usersRepository.find(identifier);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password,
		);
		return newUser.comparePassword(password);
	}
	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
