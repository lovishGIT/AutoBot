import React, { useState } from 'react';
import { Camera, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileHeader({ isEditing }) {
    const { user, updateUserProfile, logout } = useAuth();
    const [avatar, setAvatar] = useState(user?.avatar);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatar(reader.result);
                };
                reader.readAsDataURL(file);

                // Combine avatar upload with profile update
                await updateUserProfile({
                    avatar: file,
                });

                toast.success(
                    'Profile picture updated successfully',
                    {
                        position: 'top-right',
                        autoClose: 3000,
                    }
                );
        }
    };

    const handleSignOut = () => {
        try {
            logout();
            toast.success('Signed out successfully', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            toast.error('Failed to sign out', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="relative bg-blue-900/50 p-6 flex flex-col items-center">
            <div className="relative group" aria-label='Avatar'>
                <img
                    src={avatar || 'https://github.com/shadcn.png'}
                    alt={`${user?.fullName}'s avatar`}
                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-700 shadow-lg transition-all duration-300 group-hover:scale-105"
                />
                {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-3 cursor-pointer hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-110">
                        <Camera className="w-6 h-6" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>
                )}
            </div>

            <div className="mt-4 text-center flex flex-col items-center" aria-label="User's Details">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-blue-200" aria-label='Full Name'>
                        {user?.fullName}
                    </h2>
                    <button
                        onClick={handleSignOut}
                        className="text-blue-400 hover:text-blue-200 transition-colors duration-300 p-2 rounded-full hover:bg-blue-900/30"
                        title="Sign Out"
                        aria-label='Sign Out'
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-blue-400 mt-1" aria-label="User's Email">{user?.email}</p>
            </div>
        </div>
    );
}
