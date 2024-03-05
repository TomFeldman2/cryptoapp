import { Request, Response } from 'express';

export function dashboard(_: Request, res: Response): void {
    res.render('users/dashboard');
}

export function addSymbol(req: Request, res: Response) {
    res.send(req.body.symbol);
}
