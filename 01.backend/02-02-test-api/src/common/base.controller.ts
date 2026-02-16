import { Response, Router } from 'express';
import { IControllerRoute, ExpressReturnType } from './route.interface';
import type { ILoger } from '../logger/loger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILoger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}
	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}
	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}
	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const midleWare = route.midlewares?.map(m => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = midleWare ? [...midleWare, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
export { Router } from 'express';
