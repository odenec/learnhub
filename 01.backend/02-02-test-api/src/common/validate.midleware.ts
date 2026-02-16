import { ClassConstructor, plainToClass } from 'class-transformer';
import { IMidleWare } from './midleware.interface';
import { NextFunction, Response, Request, Router } from 'express';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMidleWare {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then(errors => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
