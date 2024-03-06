import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ObjectSchema } from 'joi';
import createHttpError, { BadRequest } from 'http-errors';

export default function validate(validator: ObjectSchema): RequestHandler {
    return (req: Request, _: Response, next: NextFunction) => {
        const result = validator.validate(req.body);
        if (!result.error) {
            req.body = result.value as unknown;
            return next();
        }

        return next(createHttpError(BadRequest(result.error.message)));
    };
}
