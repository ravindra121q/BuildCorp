import Project from '../models/Project.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, category, client, location, year, scope, description, status } = req.body;
    
    // Extract Cloudinary URLs from multer req.files
    const heroImage = req.files && req.files['heroImage'] ? req.files['heroImage'][0].path : '';
    const gallery = req.files && req.files['gallery'] ? req.files['gallery'].map(file => file.path) : [];

    if (!heroImage) {
      return res.status(400).json({ message: 'Hero image is required' });
    }

    const project = new Project({
      title, category, client, location, year, scope, description, status, heroImage, gallery
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, category, client, location, year, scope, description, status, galleryOrder } = req.body;
    
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Update basic fields
    project.title = title || project.title;
    project.category = category || project.category;
    project.client = client || project.client;
    project.location = location || project.location;
    project.year = year || project.year;
    project.scope = scope || project.scope;
    project.description = description || project.description;
    project.status = status || project.status;

    // Update images if new ones are uploaded
    if (req.files && req.files['heroImage']) {
      project.heroImage = req.files['heroImage'][0].path;
    }
    
    if (galleryOrder) {
      const orderArray = Array.isArray(galleryOrder) ? galleryOrder : [galleryOrder];
      let newFileIndex = 0;
      project.gallery = orderArray.map(item => {
        if (item === 'NEW_FILE') {
          if (req.files && req.files['gallery'] && req.files['gallery'][newFileIndex]) {
            const path = req.files['gallery'][newFileIndex].path;
            newFileIndex++;
            return path;
          }
          return null;
        }
        return item;
      }).filter(Boolean);
    } else if (req.files && req.files['gallery']) {
      // Legacy fallback: append new files
      project.gallery = [...project.gallery, ...req.files['gallery'].map(file => file.path)];
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
