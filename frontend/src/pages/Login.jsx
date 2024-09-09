import React, { useState } from 'react';
import LoginPageBg from "../assets/loginpagebg.png";
import LoginForm from "../components/Login/loginForm";
import RegisterForm from "../components/Login/RegisterForm";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    const [pastUser, setPastUser] = useState(true);

    return (
        <>
            <div className="bg-black w-full h-[100vh] flex justify-center items-center">
                <div className="flex justify-center items-center w-2/3 h-auto bg-white rounded-lg">
                    <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
                        <img
                            src={LoginPageBg}
                            alt="Login/Register Image"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="w-1/2 h-full flex flex-col space-y-4 justify-center items-start bg-white p-8">
                        <p>
                            <button
                                className={`text-2xl mb-4 ${
                                    pastUser && 'text-4xl font-bold'
                                }`}
                                onClick={() => setPastUser(true)}
                            >
                                Login
                            </button>
                            <span className={`text-3xl font-bold`}>
                                {' '}
                                /{' '}
                            </span>
                            <button
                                className={`text-2xl mb-4 ${
                                    !pastUser && 'text-4xl font-bold'
                                }`}
                                onClick={() => setPastUser(false)}
                            >
                                Register
                            </button>
                        </p>
                        {pastUser ? <LoginForm /> : <RegisterForm />}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}