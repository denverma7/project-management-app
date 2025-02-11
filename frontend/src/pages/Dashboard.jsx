
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Card } from "../components/ui/card";
// import api from '../api/api';
// import Navbar from '../components/Navbar';
// import ProjectList from '../components/ProjectList';
// import CreateProjectForm from '../components/CreateProjectForm'

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasks: 0,
//     documents: 0,
//     users: 0, // Only for Admins
//   });

//     // Fetch project, task and user counts
//     useEffect(() => {
//       const fetchCounts = async () => {
//         try {
//           // Fetch project count
//           const projectsResponse = await api.get('/projects/count');
//           const projectsCount = projectsResponse.data.count;
    
//           // Fetch task count
//           const tasksResponse = await api.get('/tasks/count');
//           const tasksCount = tasksResponse.data.count;
    
//           // Fetch user count (only for admins)
//           let usersCount = 0;
//           if (user?.role === 'admin') {
//             const usersResponse = await api.get('/users/count');
//             usersCount = usersResponse.data.count;
//           }
    
//           // Update state
//           setStats((prevStats) => ({
//             ...prevStats,
//             projects: projectsCount,
//             tasks: tasksCount,
//             users: usersCount,
//           }));
//         } catch (err) {
//           console.error('Failed to fetch counts:', err);
//         }
//       };
    
//       fetchCounts();
//     }, [user?.role]);

//   //   // Fetch projects on component mount
//   // useEffect(() => {
//   //   const fetchProjects = async () => {
//   //     try {
//   //       const response = await api.get('/projects');
//   //       setProjects(response.data);
//   //     } catch (err) {
//   //       console.error('Failed to fetch projects:', err);
//   //     }
//   //   };

//   //   fetchProjects();
//   // }, []);

//   // Callback when a new project is created
//   const handleProjectCreated = (newProject) => {
//     setProjects([...projects, newProject]);
//   };

//   // Callback when a project is updated
//   const handleProjectUpdated = (updatedProject) => {
//     setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
//   };

//   // Callback when a project is deleted
//   const handleProjectDeleted = (projectId) => {
//     setProjects(projects.filter((p) => p._id !== projectId));
//   };


//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
//         {user?.role === 'admin' && (
//           <div className="bg-yellow-100 p-4 rounded">
//             <h2 className="text-xl font-bold">Admin Dashboard</h2>
//             <p>You have full access to the system.</p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Total Projects</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.projects}</p>
//               </Card>
//               <Card className="p-6 ">
//                 <h3 className="text-lg font-medium">Active Tasks</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Documents</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.documents}</p>
//               </Card>

//               {/* Show User Management Only for Admins */}
//                 <Card className="p-6">
//                   <h3 className="text-lg font-medium">Total Users</h3>
//                   <p className="text-3xl font-bold mt-2">{stats.users}</p>
//                 </Card>
          
//         </div>
//         <div className='mt-12 '>
//           {/* <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1> */}
//           <ProjectList
//             projects={projects}
//             onProjectUpdated={handleProjectUpdated}
//             onProjectDeleted={handleProjectDeleted}
            
//           />
//           <CreateProjectForm onProjectCreated={handleProjectCreated} />
          
//         </div>
//           </div>
          
          
//         )}
//         {user?.role === 'user' && (
//           <div className="bg-blue-100 p-4 rounded">
//             <h2 className="text-xl font-bold">User Dashboard</h2>
//             <p>You have limited access to the system.</p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Total Projects</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.projects}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Active Tasks</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Documents</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.documents}</p>
//               </Card>
          
//             </div>
//             <div className='mt-12'>
//               {/* <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
//               <CreateProjectForm onProjectCreated={handleProjectCreated} /> */}
//               <ProjectList
//                 projects={projects}
//                 onProjectUpdated={handleProjectUpdated}
//                 onProjectDeleted={handleProjectDeleted}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Card } from "../components/ui/card";
// import api from '../api/api';
// import Navbar from '../components/Navbar';
// import ProjectList from '../components/ProjectList';
// import CreateProjectForm from '../components/CreateProjectForm';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasks: 0,
//     documents: 0,
//     users: 0, // Only for Admins
//   });

//   // Fetch project, task, and user counts
//   const fetchCounts = async () => {
//     try {
//       // Fetch project count
//       const projectsResponse = await api.get('/projects/count');
//       const projectsCount = projectsResponse.data.count;

//       // Fetch task count
//       const tasksResponse = await api.get('/tasks/count');
//       const tasksCount = tasksResponse.data.count;

//       // Fetch user count (only for admins)
//       let usersCount = 0;
//       if (user?.role === 'admin') {
//         const usersResponse = await api.get('/users/count');
//         usersCount = usersResponse.data.count;
//       }

//       // Update state
//       setStats((prevStats) => ({
//         ...prevStats,
//         projects: projectsCount,
//         tasks: tasksCount,
//         users: usersCount,
//       }));
//     } catch (err) {
//       console.error('Failed to fetch counts:', err);
//     }
//   };

//   // Fetch projects
//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data);
//     } catch (err) {
//       console.error('Failed to fetch projects:', err);
//     }
//   };

//   // Fetch counts and projects on component mount
//   useEffect(() => {
//     fetchCounts();
//     fetchProjects();
//   }, [user?.role]);

//   // Callback when a new project is created
//   const handleProjectCreated = (newProject) => {
//     setProjects([...projects, newProject]);
//     fetchCounts(); // Refresh counts after creating a project
//   };

//   // Callback when a project is updated
//   const handleProjectUpdated = (updatedProject) => {
//     setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
//     fetchCounts(); // Refresh counts after updating a project
//   };

//   // Callback when a project is deleted
//   const handleProjectDeleted = (projectId) => {
//     setProjects(projects.filter((p) => p._id !== projectId));
//     fetchCounts(); // Refresh counts after deleting a project
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
//         {user?.role === 'admin' && (
//           <div className="bg-yellow-100 p-4 rounded">
//             <h2 className="text-xl font-bold">Admin Dashboard</h2>
//             <p>You have full access to the system.</p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Total Projects</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.projects}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Active Tasks</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Documents</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.documents}</p>
//               </Card>

//               {/* Show User Management Only for Admins */}
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Total Users</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.users}</p>
//               </Card>
//             </div>
//             <div className="mt-12">
//               <ProjectList
//                 projects={projects}
//                 onProjectUpdated={handleProjectUpdated}
//                 onProjectDeleted={handleProjectDeleted}
//               />
//               <CreateProjectForm onProjectCreated={handleProjectCreated} />
//             </div>
//           </div>
//         )}
//         {user?.role === 'user' && (
//           <div className="bg-blue-100 p-4 rounded">
//             <h2 className="text-xl font-bold">User Dashboard</h2>
//             <p>You have limited access to the system.</p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Total Projects</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.projects}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Active Tasks</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
//               </Card>
//               <Card className="p-6">
//                 <h3 className="text-lg font-medium">Documents</h3>
//                 <p className="text-3xl font-bold mt-2">{stats.documents}</p>
//               </Card>
//             </div>
//             <div className="mt-12">
//               <ProjectList
//                 projects={projects}
//                 onProjectUpdated={handleProjectUpdated}
//                 onProjectDeleted={handleProjectDeleted}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from "../components/ui/card";
import api from '../api/api';
import Navbar from '../components/Navbar';
import ProjectList from '../components/ProjectList';
import CreateProjectForm from '../components/CreateProjectForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    documents: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all counts and projects
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all counts in parallel
      const [projectsResponse, tasksResponse, documentsResponse] = await Promise.all([
        api.get('/projects/count'),
        api.get('/tasks/count'),
        api.get('/documents/count')
      ]);

      let usersCount = 0;
      if (user?.role === 'admin') {
        const usersResponse = await api.get('/users/count');
        usersCount = usersResponse.data.count;
      }

      // Update stats
      setStats({
        projects: projectsResponse.data.count,
        tasks: tasksResponse.data.count,
        documents: documentsResponse.data.count,
        users: usersCount,
      });

      // Fetch projects
      const projectsListResponse = await api.get('/projects');
      setProjects(projectsListResponse.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts and when user changes
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Callback when a new project is created
  const handleProjectCreated = async (newProject) => {
    setProjects([...projects, newProject]);
    await fetchDashboardData(); // Refresh all counts
  };

  // Callback when a project is updated
  const handleProjectUpdated = async (updatedProject) => {
    setProjects(projects.map((p) => (p._id === updatedProject._id ? updatedProject : p)));
    await fetchDashboardData(); // Refresh all counts
  };

  // Callback when a project is deleted
  const handleProjectDeleted = async (projectId) => {
    setProjects(projects.filter((p) => p._id !== projectId));
    await fetchDashboardData(); // Refresh all counts
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

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
              <Card className="p-6">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-3xl font-bold mt-2">{stats.users}</p>
              </Card>
            </div>
            <div className="mt-12">
              <ProjectList
                projects={projects}
                onProjectUpdated={handleProjectUpdated}
                onProjectDeleted={handleProjectDeleted}
              />
              <CreateProjectForm onProjectCreated={handleProjectCreated} />
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
            <div className="mt-12">
              <ProjectList
                projects={projects}
                onProjectUpdated={handleProjectUpdated}
                onProjectDeleted={handleProjectDeleted}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;