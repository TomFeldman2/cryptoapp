import { Router } from 'express';
import { welcome } from './controller';

const router = Router();

router.get('/', welcome);

export default router;
