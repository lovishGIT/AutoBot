import React, { useState, useEffect } from 'react';
import { ProjectProvider } from '@/context/projects.context';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/Profile/profileHeader';
import ProfileDetails from '@/components/Profile/profileDetails';
import ProjectDisplay from '@/components/Profile/projectDisplay';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } =
        useAuth();

    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login');
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <ProjectProvider>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
                    <ProfileHeader isEditing={isEditing} />

                    <ProfileDetails
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />

                    <ProjectDisplay />
                </div>
            </div>
        </ProjectProvider>
    );
};

export default ProfilePage;
