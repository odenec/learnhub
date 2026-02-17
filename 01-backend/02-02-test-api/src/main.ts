import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/loger.service';
import { ILoger } from './logger/loger.interface';
import { UserController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUsersServise } from './users/users.service.interface';
import { UserServise } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule(({ bind }) => {
	bind<ILoger>(TYPES.ILoger).to(LoggerService).inSingletonScope();
	bind<ExeptionFilter>(TYPES.IExeptionFilter)
		.to(ExeptionFilter)
		.inSingletonScope();
	bind<IUsersController>(TYPES.UserController)
		.to(UserController)
		.inSingletonScope();
	bind<IUsersServise>(TYPES.UserService).to(UserServise);
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository)
		.to(UsersRepository)
		.inSingletonScope();
	bind<App>(TYPES.Aplication).to(App).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Aplication);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
