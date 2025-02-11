import React, { useState } from 'react';
import api from '../api/api';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects', { name, description });
      onProjectCreated(response.data); // Callback to update the project list
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-4">Create New Project</h2>
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;