import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() {
    return (
        <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center space-y-4">
            <h1 className="text-6xl">404 Page Not Found.</h1>
            <p className="text-xl">You don't Belong here</p>
            <Link className='bg-gradient-to-r from-[#43D8C9] to-[#042d76] text-white px-4 py-2 rounded-lg' to="/">Back To Home</Link>
        </div>
    );
}
