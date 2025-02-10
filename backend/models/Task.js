const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to the project
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user assigned to the task
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);