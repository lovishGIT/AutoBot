import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email, password };

        const url = 'http://localhost:3000/api/user/login';
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful:', response.data);
            setUser({ ...response.data });
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response);
            toast.error(error.response.data);
        }
    };

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="w-full mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button className="bg-[#081547] text-white text-lg w-[100%] py-2 px-2" type='submit'>Login</button>
            </form>
        </>
    );
};