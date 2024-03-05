import { Router } from 'express';
import { addSymbol, dashboard } from './controller';

const router = Router();

router.get('/dashboard', dashboard);
router.post('/symbols/add', addSymbol);

export default router;
