import express from 'express';
import { test, updateUser, deleteUser, signOut } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.post('/signout', signOut);

export default router;