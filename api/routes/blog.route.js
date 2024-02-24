import express from 'express';
import { create } from '../controllers/blog.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-post', verifyUser, create);

export default router;