import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProfileDropdown = ({ setIsMenuOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSignOut = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
            >
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={
                        user.avatar || 'https://github.com/shadcn.png'
                    }
                    alt={`${user.fullName}'s profile`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">
                            {user.fullName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {user.email}
                        </p>
                    </div>
                    <ul className="py-1">
                        <li>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                <User className="mr-3 w-4 h-4 text-gray-400" />
                                Profile Dashboard
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                to="/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                <Settings className="mr-3 w-4 h-4 text-gray-400" />
                                Settings
                            </Link>
                        </li> */}
                        <li>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                            >
                                <LogOut className="mr-3 w-4 h-4" />
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
