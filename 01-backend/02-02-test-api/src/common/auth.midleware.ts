import { Request, Response, NextFunction } from 'express';
import { IMidleWare } from './midleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMidleware implements IMidleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		const authHeadder = req.headers.authorization;
		if (!authHeadder) {
			return next();
		}
		const token = authHeadder?.split(' ')[1];
		if (!token) {
			return next();
		}

		verify(token, this.secret, (err, payload) => {
			if (err) {
				return next();
			} else if (payload && typeof payload === 'object' && 'email' in payload) {
				req.user = payload.email as string;
			}
			next();
		});
	}
}
