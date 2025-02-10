
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from "../components/ui/card";
import api from '../api/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    documents: 0,
    users: 0, // Only for Admins
  });

    // Fetch project, task and user counts
    useEffect(() => {
      const fetchCounts = async () => {
        try {
          // Fetch project count
          const projectsResponse = await api.get('/projects/count');
          const projectsCount = projectsResponse.data.count;
    
          // Fetch task count
          const tasksResponse = await api.get('/tasks/count');
          const tasksCount = tasksResponse.data.count;
    
          // Fetch user count (only for admins)
          let usersCount = 0;
          if (user?.role === 'admin') {
            const usersResponse = await api.get('/users/count');
            usersCount = usersResponse.data.count;
          }
    
          // Update state
          setStats((prevStats) => ({
            ...prevStats,
            projects: projectsCount,
            tasks: tasksCount,
            users: usersCount,
          }));
        } catch (err) {
          console.error('Failed to fetch counts:', err);
        }
      };
    
      fetchCounts();
    }, [user?.role]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
        {user?.role === 'admin' && (
          <div className="bg-yellow-100 p-4 rounded">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <p>You have full access to the system.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium">Total Projects</h3>
                <p className="text-3xl font-bold mt-2">{stats.projects}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Active Tasks</h3>
                <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Documents</h3>
                <p className="text-3xl font-bold mt-2">{stats.documents}</p>
              </Card>

              {/* Show User Management Only for Admins */}
                <Card className="p-6">
                  <h3 className="text-lg font-medium">Total Users</h3>
                  <p className="text-3xl font-bold mt-2">{stats.users}</p>
                </Card>
          
        </div>
          </div>
          
          
        )}
        {user?.role === 'user' && (
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="text-xl font-bold">User Dashboard</h2>
            <p>You have limited access to the system.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium">Total Projects</h3>
                <p className="text-3xl font-bold mt-2">{stats.projects}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Active Tasks</h3>
                <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Documents</h3>
                <p className="text-3xl font-bold mt-2">{stats.documents}</p>
              </Card>
          
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;