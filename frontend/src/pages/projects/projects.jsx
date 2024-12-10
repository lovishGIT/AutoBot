import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/user.context';
import { ProjectProvider } from '@/context/projects.context';
import ProjectDashboard from './projectDashboard';
import AddProjectPage from './AddProject';
import NotFound from '../NotFound';
import SingleProjectPage from './singleProduct';

const UserProjectDashboard = () => {
    const { user, isLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
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
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </ProjectProvider>
    );
};

export default UserProjectDashboard;
