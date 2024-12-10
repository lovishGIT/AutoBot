import React, { useContext } from 'react';
import {
    Rocket,
    User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '@/context/user.context';

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);

    const handleSignOut = () => {
        signOutUser();
        toast.success('Successfully Logged Out!');
    };

    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Rocket className="w-10 h-10 text-blue-500 mr-3" />
                    <span className="text-2xl font-bold text-white">
                        AutoBot
                    </span>
                </div>
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/projects"
                        className="text-gray-300 hover:text-white transition"
                    >
                        Projects
                    </Link>
                    {user?.fullName ? (
                        <button
                            onClick={handleSignOut}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
