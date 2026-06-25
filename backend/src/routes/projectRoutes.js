import express from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Array of projects
 */
router.get('/', getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 */
router.get('/:id', getProjectById);

// Protected Admin Routes with Cloudinary Multi-File Upload Support
router.post(
  '/', 
  authenticateToken, 
  upload.fields([
    { name: 'heroImage', maxCount: 1 }, 
    { name: 'gallery', maxCount: 6 }
  ]), 
  createProject
);

router.put(
  '/:id', 
  authenticateToken, 
  upload.fields([
    { name: 'heroImage', maxCount: 1 }, 
    { name: 'gallery', maxCount: 6 }
  ]), 
  updateProject
);

router.delete('/:id', authenticateToken, deleteProject);

export default router;
