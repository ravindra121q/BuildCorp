import express from 'express';
import { getContentByPage, upsertContent } from '../controllers/contentController.js';
import { authenticateToken } from '../auth.js';
import { setCache } from '../middleware/cache.js';

const router = express.Router();

router.get('/:page', setCache, getContentByPage);

router.put('/', authenticateToken, upsertContent);

export default router;
