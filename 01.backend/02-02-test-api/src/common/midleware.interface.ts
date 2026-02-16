import { NextFunction, Request, Response } from 'express';

export interface IMidleWare {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
