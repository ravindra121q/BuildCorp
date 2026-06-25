import express from 'express';
import { getContentByPage, upsertContent } from '../controllers/contentController.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

/**
 * @swagger
 * /content/{page}:
 *   get:
 *     summary: Get content blocks for a specific page
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *           enum: [home, about, services, contact]
 *     responses:
 *       200:
 *         description: Key-value map of content sections
 */
router.get('/:page', getContentByPage);

/**
 * @swagger
 * /content:
 *   put:
 *     summary: Create or update a specific content block (Admin Only)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: string
 *               section:
 *                 type: string
 *               contentHtml:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated content block
 */
router.put('/', authenticateToken, upsertContent);

export default router;
