import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProjectProvider } from '@/context/projects.context';
import ProjectDashboard from './projectDashboard';
import AddProjectPage from './AddProject';
import SingleProjectPage from './singleProduct';
import { useAuth } from '@/hooks/useAuth';

const UserProjectDashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !isAuthenticated) {
            setError('You need to login to view projects');
            navigate('/login');
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <div className="text-center text-red-500">
                {error || 'Redirecting to login...'}
            </div>
        );
    }

    return (
        <ProjectProvider>
            <Routes>
                <Route path="/" element={<ProjectDashboard />} />
                <Route path="/add" element={<AddProjectPage />} />
                <Route path="/:id" element={<SingleProjectPage />} />
            </Routes>
        </ProjectProvider>
    );
};

export default UserProjectDashboard;
