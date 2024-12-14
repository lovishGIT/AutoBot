import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { Edit, Mail, Save, User, X } from 'lucide-react';

export default function ProfileDetails({
    isEditing,
    setIsEditing
}) {
    const { user, updateUserProfile } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        avatar: null,
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
            e.preventDefault();

                await updateUserProfile({
                    fullName: formData.fullName,
                });

                setIsEditing(false);
                toast.success('Profile updated successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                });

        };
    return (
        <div className="p-6 bg-blue-900/50">
            <div className="flex justify-end mb-4">
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-400 hover:text-blue-300 transition flex items-center"
                    >
                        <Edit className="w-5 h-5 mr-2" /> Edit Profile
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-red-400 hover:text-red-300 transition flex items-center"
                    >
                        <X className="w-5 h-5 mr-2" /> Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* Full Name */}
                    <div className="flex items-center space-x-4">
                        <User className="text-blue-400 w-6 h-6" />
                        {isEditing ? (
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="flex-grow px-3 py-2 border border-blue-800 bg-blue-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                                required
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <p className="text-blue-100">
                                {user?.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <Mail className="text-blue-400 w-6 h-6" />
                        <p className="text-blue-100">{user?.email}</p>
                    </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
