const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin-only route
router.get('/dashboard', adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;