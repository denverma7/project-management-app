import React, { useState } from 'react';
import api from '../api/api';

const ProjectList = ({ projects, onProjectUpdated, onProjectDeleted }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/projects/${editingProject._id}`, { name, description });
      onProjectUpdated(response.data); // Callback to update the project list
      setEditingProject(null);
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      onProjectDeleted(projectId); // Callback to update the project list
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      {projects.map((project) => (
        <div key={project._id} className="bg-white p-4 rounded shadow mb-4">
          {editingProject?._id === project._id ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>{project.description}</p>
              <button
                onClick={() => {
                  setEditingProject(project);
                  setName(project.name);
                  setDescription(project.description);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;