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
import { setCache } from '../middleware/cache.js';

const router = express.Router();

router.get('/', setCache, getAllProjects);

router.get('/:id', setCache, getProjectById);


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
