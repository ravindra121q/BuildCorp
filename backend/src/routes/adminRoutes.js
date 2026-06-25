import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Authenticate Admin User
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginAdmin);

export default router;
