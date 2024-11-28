import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the UserContext
const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    signUp: (userData) => {},
    signIn: (credentials) => {},
    signOutUser: () => {},
    updateUserProfile: () => {},
    isLoading: false,
});

const API_BASE_URL = (import.meta.env.API_URL || 'http://localhost:3000') + '/api/users';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
                const response = await axios.get(
                    `${API_BASE_URL}/verify`,
                    {
                        withCredentials: true
                    }
                );

                if (response.data.user) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                }
        } catch (error) {
            console.error('Token verification failed', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/register`,
                userData, {
                    withCredentials: true
                }
            );

            setUser(response.data);
            setIsAuthenticated(true);

            // toast.success('Successfully registered!');
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Registration failed'
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (credentials) => {
        try {

            setIsLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                credentials, {
                    withCredentials: true
                }
            );

            setUser(response.data);
            setIsAuthenticated(true);

            // toast.success('Successfully logged in!');
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Login failed'
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOutUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
    };

    // Update User Profile
    const updateUserProfile = async (updatedData) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/update`,
                updatedData, {
                    withCredentials: true
                }
            );

            setUser(response.data.user);
            toast.success('Profile updated successfully');
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    'Profile update failed'
            );
            throw error;
        }
    };

    // Context value
    const contextValue = {
        user,
        isAuthenticated,
        signUp,
        signIn,
        signOutUser,
        updateUserProfile,
        isLoading,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {!isLoading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};