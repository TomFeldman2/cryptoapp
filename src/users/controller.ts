import { NextFunction, Request, Response } from 'express';
import { getUserSymbols, saveUserSymbol } from '../user_symbols/crud';
import { UserSymbol } from '../user_symbols/dto';
import { getLatestSymbolValue } from '../symbol-value/crud';
import config from 'config';
import { assertHasUser } from '../middlewares/enforce-auth';

export async function dashboard(req: Request, res: Response): Promise<void> {
    assertHasUser(req);
    const userSymbols = await getUserSymbols(req.user.id);
    const symbolValues = await Promise.all(userSymbols.map((symbol) => getLatestSymbolValue(symbol.symbol)));
    res.render('users/dashboard', {
        symbolValues,
        io: config.get('app.io')
    });
}

export async function addSymbol(req: Request, res: Response, next: NextFunction): Promise<void> {
    assertHasUser(req);
    try {
        const userSymbol: UserSymbol = {
            symbol: req.body.symbol,
            user_id: req.user.id
        };

        await saveUserSymbol(userSymbol);
        res.redirect('/users/dashboard');
    } catch (e) {
        next(e);
    }
}
