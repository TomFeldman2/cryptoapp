import { NextFunction, Request, Response } from 'express';
import createHttpError, { Unauthorized } from 'http-errors';

export default function enforceAuth(req: Request, _: Response, next: NextFunction) {
    if (!req.user.id) {
        next(createHttpError(Unauthorized()));
    }

    next();
}

type RequestWithUser = Request & { user: number };

export function assertHasUser(req: Request): asserts req is RequestWithUser {
    if (!('user' in req)) {
        throw new Error('Request object without user found unexpectedly');
    }
}
