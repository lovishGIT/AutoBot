import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '@/components/Login/LoginForm';
import RegisterForm from '@/components/Login/RegisterForm';
import { UserContext } from '@/context/user.context';
import { toast } from 'react-toastify';

export default function Login() {
    const { isAuthenticated } = useContext(UserContext);
    const [pastUser, setPastUser] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setError(null);
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
            <div className="bg-gray-900 w-full min-h-screen flex justify-center items-center">
                <div className="w-4/5 max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                    {/* Image Section */}
                    <div className="hidden md:flex items-center justify-center bg-gray-700 p-8">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-full h-full rounded-2xl flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold mb-4">
                                    {pastUser
                                        ? 'Welcome Back!'
                                        : 'Join Our Community'}
                                </h2>
                                <p className="text-gray-200">
                                    {pastUser
                                        ? 'Sign in to continue your journey'
                                        : 'Create an account to get started'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 flex flex-col justify-center">
                        <div className="mb-8 flex justify-center items-center space-x-4">
                            <button
                                className={`text-2xl transition-all ${
                                    pastUser
                                        ? 'text-white font-bold scale-110'
                                        : 'text-gray-500 hover:text-white'
                                }`}
                                onClick={() => setPastUser(true)}
                            >
                                Login
                            </button>
                            <span className="text-gray-600 text-2xl">
                                /
                            </span>
                            <button
                                className={`text-2xl transition-all ${
                                    !pastUser
                                        ? 'text-white font-bold scale-110'
                                        : 'text-gray-500 hover:text-white'
                                }`}
                                onClick={() => setPastUser(false)}
                            >
                                Register
                            </button>
                        </div>
                        {pastUser ? (
                            <LoginForm
                                setError={setError}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        ) : (
                            <RegisterForm
                                setError={setError}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        )}
                    </div>
                </div>
            </div>
    );
}
