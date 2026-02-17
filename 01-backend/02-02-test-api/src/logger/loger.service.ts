import { Logger, ILogObj } from 'tslog';
import { ILoger } from './loger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
@injectable()
export class LoggerService implements ILoger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger<ILogObj>({
			type: 'pretty',
			prettyLogTemplate: '{{dateIsoStr}} {{logLevelName}} ',
			prettyLogTimeZone: 'local',
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
