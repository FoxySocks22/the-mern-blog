import Express from 'express';
import { signup, signin, google } from '../controllers/auth.controller.js';

const router = Express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;