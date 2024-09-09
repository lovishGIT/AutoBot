import React, { useState } from 'react';
import axios from "axios";

export default function RegisterForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            console.error("password not same.")
        }
        const formData = {
            fullName: firstName.trim() + ' ' + lastName.trim(),
            email, password
        }
        const url = 'http://localhost:3000/api/user/register';
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    First Name
                </label>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                </label>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
            </div>
            <div className="mb-4">
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
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm Password"
                />
            </div>
            <div className="mb-6 flex gap-2 items-center">
                <input
                    type="checkbox"
                    id="termsAndConditionsCheckbox"
                    className="shadow border-black rounded w-[15px] h-[15px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultChecked={termsAndConditions}
                    onClick={() => setTermsAndConditions(!termsAndConditions)}
                />
                <label htmlFor="termsAndConditionsCheckbox" className={`block text-gray-700 font-bold mb-2 ${!termsAndConditions ? 'text-red-500' : ''}`}>
                    I agree to all the Terms and Conditions.
                </label>
            </div>
            <button
                className="bg-[#111f58] text-white text-lg w-[100%] py-2 px-2"
                type="submit"
            >
                Register
            </button>
        </form>
    );
};
