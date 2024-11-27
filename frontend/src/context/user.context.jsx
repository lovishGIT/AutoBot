import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the UserContext
export const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    signUp: () => {},
    signIn: () => {},
    signOutUser: () => {},
    updateUserProfile: () => {},
    isLoading: false,
});

// API Base URL - adjust to your backend endpoint
const API_BASE_URL = (import.meta.env.API_URL || 'http://localhost:3000') + '/api/users';

// UserProvider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(
                    `${API_BASE_URL}/verify`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.data.user) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            console.error('Token verification failed', error);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Sign Up Function
    const signUp = async (userData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/register`,
                userData
            );

            console.log(response.data);
            // Store token and set user
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            setIsAuthenticated(true);

            toast.success('Successfully registered!');
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

    // Sign In Function
    const signIn = async (credentials) => {
        try {
            // console.log(credentials);

            setIsLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                credentials
            );

            // Store token and set user
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            setIsAuthenticated(true);

            toast.success('Successfully logged in!');
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

    // Sign Out Function
    const signOutUser = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
    };

    // Update User Profile
    const updateUserProfile = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${API_BASE_URL}/update`,
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` },
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
