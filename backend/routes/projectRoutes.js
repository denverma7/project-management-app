// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const Project = require('../models/Project');
// const {
//   createProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } = require('../controllers/projectController');

// // Get total number of projects for the logged-in user
// router.get('/count', authMiddleware, async (req, res) => {
//   try {
//     const count = await Project.countDocuments({ createdBy: req.userId });
//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Protected routes (require JWT authentication)
// router.post('/', authMiddleware, createProject);
// router.get('/', authMiddleware, getProjects);
// router.get('/:id', authMiddleware, getProjectById);
// router.put('/:id', authMiddleware, updateProject);
// router.delete('/:id', authMiddleware, deleteProject);

// module.exports = router;


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Get all projects for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.userId }); // Fetch projects for the logged-in user
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Create a new project
router.post('/', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.create({
      name,
      description,
      createdBy: req.userId, // Attach the user ID from the JWT token
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a project
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the logged-in user is the creator of the project
    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.updatedAt = Date.now();

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the logged-in user is the creator of the project
    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;