import { RequestHandler, Router } from 'express';
import { addSymbol, dashboard } from './controller';
import validate from '../middlewares/input-validation';
import { addSymbolValidator } from './validator';

const router = Router();

router.get('/dashboard', dashboard as RequestHandler);
router.post('/symbols/add', validate(addSymbolValidator), addSymbol as RequestHandler);

export default router;
