import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import type { ILoger } from '../logger/loger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;
	adapter: PrismaBetterSqlite3;
	constructor(@inject(TYPES.ILoger) private loggerService: ILoger) {
		this.adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
		this.client = new PrismaClient({ adapter: this.adapter });
	}

	async connect() {
		try {
			await this.client.$connect();
			this.loggerService.log('[PrismaService] Успешное подключение к DB');
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.error(
					'[PrismaService] Ошибка подключения к DB ' + e.message,
				);
			}
		}
	}
	async disconnect() {
		await this.client.$disconnect();
	}
}
