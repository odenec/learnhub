import { inject, injectable } from 'inversify';
import type { ILoger } from '../logger/loger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILoger) private logger: ILoger) {
		const result: DotenvConfigOutput = config({
			quiet: true,
		});

		if (result.error) {
			this.logger.error(
				'[ConfigService] Не удалось прочитать файл .env или он отсутствует',
			);
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загруженна');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
