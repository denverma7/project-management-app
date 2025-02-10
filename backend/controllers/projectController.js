const Project = require('../models/Project');

// Create a new project
const createProject = async (req, res) => {
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
};

// Get all projects for the logged-in user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.updatedAt = Date.now();

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};