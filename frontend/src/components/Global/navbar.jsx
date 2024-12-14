import React, { useState } from 'react';
import { Rocket, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ProfileDropdown from './profileDrpodown';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Rocket className="w-10 h-10 text-blue-500 mr-3" />
                    <span className="text-2xl font-bold text-white">
                        AutoBot
                    </span>
                </div>

                <div className="flex justify-end items-center gap-6">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
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
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-gray-900 md:hidden">
                            <div className="flex flex-col items-center space-y-4 py-6">
                                <Link
                                    to="/"
                                    className="text-gray-300 hover:text-white transition"
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/projects"
                                    className="text-gray-300 hover:text-white transition"
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                >
                                    Projects
                                </Link>
                            </div>
                        </div>
                    )}

                    {user?.fullName ? (
                        <ProfileDropdown
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={() => setIsMenuOpen(false)}
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
