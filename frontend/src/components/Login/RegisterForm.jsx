import React, { useContext, useState } from 'react';
import {
    ArrowRight,
    Lock,
    Mail,
    User,
    Eye,
    EyeOff,
} from 'lucide-react';
import { UserContext } from '@/context/user.context';
import { toast } from 'react-toastify';


const RegisterForm = ({ setError, showPassword, setShowPassword }) => {
    const { signUp, isLoading } = useContext(UserContext);
    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic password validation
        if (registerData.password !== registerData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            await signUp({
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
            });
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleRegister} className="w-full space-y-6">
            <div>
                <label className="text-gray-400 mb-2 flex items-center">
                    <User className="mr-2 text-blue-500" size={20} />
                    Full Name
                </label>
                <input
                    type="text"
                    name="fullName"
                    required
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                />
            </div>
            <div>
                <label className="text-gray-400 mb-2 flex items-center">
                    <Mail className="mr-2 text-blue-500" size={20} />
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label className="text-gray-400 mb-2 flex items-center">
                    <Lock className="mr-2 text-blue-500" size={20} />
                    Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a strong password"
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
            <div>
                <label className="text-gray-400 mb-2 flex items-center">
                    <Lock className="mr-2 text-blue-500" size={20} />
                    Confirm Password
                </label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
            >
                {isLoading ? 'Creating Account...' : 'Register'}
                <ArrowRight className="ml-2" />
            </button>
        </form>
    );
};

export default RegisterForm;