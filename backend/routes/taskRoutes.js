const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Get total number of tasks for the logged-in user
router.get('/count', authMiddleware, async (req, res) => {
  try {
    const count = await Task.countDocuments({ createdBy: req.userId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes (require JWT authentication)
router.post('/', authMiddleware, createTask);
router.get('/project/:projectId', authMiddleware, getTasksByProject);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;