import { Request, Response } from 'express';

export function welcome(_: Request, res: Response): void {
    res.render('guests/welcome');
}
