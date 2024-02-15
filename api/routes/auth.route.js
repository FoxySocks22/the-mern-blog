import Express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = Express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;