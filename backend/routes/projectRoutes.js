const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Get total number of projects for the logged-in user
router.get('/count', authMiddleware, async (req, res) => {
  try {
    const count = await Project.countDocuments({ createdBy: req.userId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes (require JWT authentication)
router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;