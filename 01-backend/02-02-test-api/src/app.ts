import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import type { ILoger } from './logger/loger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import type { IExeptionFilter } from './errors/exeption.filter.interface';
import type { IUsersController } from './users/users.controller.interface';
import { PrismaService } from './database/prisma.service';
@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(TYPES.ILoger) private loggerService: ILoger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
    
	) {
		this.app = express();
		this.port = 8000;
	}
	useMidleware(): void {
		this.app.use(json());
	}
	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch);
	}
	public async init(): Promise<void> {
		this.useMidleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
