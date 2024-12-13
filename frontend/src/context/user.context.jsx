import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Create the UserContext
export const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    signUp: (userData) => {},
    signIn: (credentials) => {},
    signOutUser: () => {},
    updateUserProfile: () => {},
    isLoading: false,
});

const API_BASE_URL =
    (import.meta.env.VITE_API_URL || 'http://localhost:4000') +
    '/api/users';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // useEffect(() => {
        // const checkAuthStatus = async () => {

        //     setLoading(true);

        //     if (token) {
        //         try {
        //             // Send token for verification
        //             const response = await axios.get(
        //                 `${API_BASE_URL}/verify`, {
        //                     withCredentials: true,
        //                 }
        //             );
        //             console.log("CheckAuthStatus", response.data);

        //             if (response.data) {

        //                 setUser(response.data);
        //                 setIsAuthenticated(true);
        //             } else {
        //                 setIsAuthenticated(false);
        //             }
        //         } catch (error) {
        //             setIsAuthenticated(false);
        //         } finally {
        //             setLoading(false);
        //         }
        //     } else {
        //         setIsAuthenticated(false);
        //         setLoading(false);
        //     }
        // };

        // checkAuthStatus();
    // }, []);

    const signUp = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/register`,
                userData, {
                    withCredentials: true, // Ensure cookies are sent with the request
                }
            );

            setUser(response.data);
            setIsAuthenticated(true);
            // The token is already set as a cookie by the backend, no need to store it manually

            toast.success('Successfully registered!');
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Registration failed'
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (credentials) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                credentials,
                {
                    withCredentials: true, // Ensure cookies are sent with the request
                }
            );

            if (response.data) {
                setUser(response.data);
                setIsAuthenticated(true);
                // The token is already set as a cookie by the backend, no need to store it manually

                toast.success('Successfully logged in!');
                return response.data;
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Login failed'
            );
        } finally {
            setLoading(false);
        }
    };

    const signOutUser = () => {
        Cookies.remove('token'); // Remove token from cookies
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/update`,
                updatedData, {
                    withCredentials: true, // Ensure cookies are sent with the request
                }
            );

            setUser(response.data);
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
            {children}
        </UserContext.Provider>
    );
};
