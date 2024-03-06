import { NextFunction, Request, Response } from 'express';
import { saveUserSymbol } from '../user_symbols/crud';
import { UserSymbol } from '../user_symbols/dto';

interface TypedRequestBody<T> extends Express.Request {
    body: T;
}

export function dashboard(_: Request, res: Response): void {
    res.render('users/dashboard');
}

export async function addSymbol(
    req: TypedRequestBody<{
        symbol: string;
    }>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userSymbol: UserSymbol = {
            symbol: req.body.symbol,
            userId: 1
        };

        const symbolId = await saveUserSymbol(userSymbol);
        res.json({ id: symbolId });
    } catch (e) {
        next(e);
    }
}
