import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class UserLoginDto {
	@ValidateIf(o => !o.username)
	@IsEmail({}, { message: 'Неверно указан email' })
	email?: string;

	@ValidateIf(o => !o.email)
	@IsString({ message: 'Неверно указан логин' })
	username?: string;

	@IsString({ message: 'Неверно указан пароль' })
	password: string;
}
