// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const Task = require('../models/Task');
// const {
//   createTask,
//   getTasksByProject,
//   updateTask,
//   deleteTask,
// } = require('../controllers/taskController');

// // Get total number of tasks for the logged-in user
// router.get('/count', authMiddleware, async (req, res) => {
//   try {
//     const count = await Task.countDocuments({ createdBy: req.userId });
//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Protected routes (require JWT authentication)
// router.post('/', authMiddleware, createTask);
// router.get('/project/:projectId', authMiddleware, getTasksByProject);
// router.put('/:id', authMiddleware, updateTask);
// router.delete('/:id', authMiddleware, deleteTask);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, project, assignedTo } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.userId, // Attach the user ID from the JWT token
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the logged-in user is the creator of the task
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;
    task.updatedAt = Date.now();

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the logged-in user is the creator of the task
    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;