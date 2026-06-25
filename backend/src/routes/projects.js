import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ completionDate: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ isFeatured: true }).sort({ completionDate: -1 }).limit(3);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
