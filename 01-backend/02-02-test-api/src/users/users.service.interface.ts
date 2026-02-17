import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/user-registr.dto';
import { User } from './user.entity';
export interface IUsersServise {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserRegisterDto) => Promise<boolean>;
}
