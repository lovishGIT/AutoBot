import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = ({ setError, showPassword, setShowPassword }) => {
    const { signIn, isLoading } = useAuth();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            await signIn(loginData);
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="relative">
                <label className="text-gray-400 mb-2 flex items-center">
                    <Mail className="mr-2 text-blue-500" size={20} />
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />
            </div>
            <div className="relative">
                <label className="text-gray-400 mb-2 flex items-center">
                    <Lock className="mr-2 text-blue-500" size={20} />
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
            >
                {isLoading ? 'Logging In...' : 'Login'}
                <ArrowRight className="ml-2" />
            </button>
            <div className="text-center">
                <Link
                    to="/forgot-password"
                    className="text-blue-400 hover:underline"
                >
                    Forgot Password?
                </Link>
            </div>
        </form>
    );
};


export default LoginForm;
