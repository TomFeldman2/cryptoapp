import { NextFunction, Request, Response } from 'express';
import { getUserSymbols, saveUserSymbol } from '../user_symbols/crud';
import { UserSymbol } from '../user_symbols/dto';
import { getLatestSymbolValue } from '../symbol-value/crud';

interface TypedRequestBody<T> extends Express.Request {
    body: T;
}

export async function dashboard(_: Request, res: Response): Promise<void> {
    const userSymbols = await getUserSymbols(1);
    const symbolValues = await Promise.all(userSymbols.map((symbol) => getLatestSymbolValue(symbol.symbol)));
    res.render('users/dashboard', {
        symbolValues
    });
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

        await saveUserSymbol(userSymbol);
        res.redirect('/users/dashboard');
    } catch (e) {
        next(e);
    }
}
