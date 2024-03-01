import express from 'express';
import { publish, getPageContent } from '../controllers/content.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/:id', verifyUser, publish);
router.get('/:id', verifyUser, getPageContent);

export default router;