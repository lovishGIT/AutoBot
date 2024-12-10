import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/user.context';
import { ProjectProvider } from '@/context/projects.context';
import ProjectDashboard from './projectDetails';

const UserProjectDashboard = () => {
    const { user, isLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        // Wait for auth check to complete before redirecting
        if (!user) {
            setError('You need to login to view projects');
            navigate('/login');
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state
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
            <ProjectDashboard />
        </ProjectProvider>
    );
};

export default UserProjectDashboard;
