import express from 'express';
import { getContentByPage, upsertContent } from '../controllers/contentController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

router.get('/:page', getContentByPage);

router.put('/', authenticateToken, upsertContent);

export default router;
