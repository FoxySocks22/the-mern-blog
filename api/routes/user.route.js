import Express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = Express.Router();

router.get('/test', test);
router.put('/update/:id', verifyUser, updateUser);

export default router;