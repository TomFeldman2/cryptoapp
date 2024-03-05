import { RequestHandler, Router } from 'express';
import { addSymbol, dashboard } from './controller';

const router = Router();

router.get('/dashboard', dashboard);
router.post('/symbols/add', addSymbol as RequestHandler);

export default router;
