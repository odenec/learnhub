import { NextFunction, Response, Request, Router } from 'express';
import { IMidleWare } from './midleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	midlewares?: IMidleWare[];
}
export type ExpressReturnType = Response<any, Record<string, any>>;
