import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'Неверно указан пароль' })
	password: string;

	@IsString({ message: 'Неверно указан имя' })
	name: string;
}
