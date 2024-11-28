import React from 'react'
import { Rocket, Users, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Rocket className="w-6 h-6 mr-2 text-blue-500" />{' '}
                        AutoBot
                    </h3>
                    <p className="text-gray-400">
                        Revolutionizing workflow automation with
                        intelligent, adaptable solutions.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Quick Links
                    </h4>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="text-gray-300 hover:text-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projects"
                                className="text-gray-300 hover:text-white"
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-gray-300 hover:text-white"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-300 hover:text-white"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Connect With Us
                    </h4>
                    <div className="flex space-x-4">
                        {/* Social media icons can be added here */}
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white"
                        >
                            <Globe className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white"
                        >
                            <Users className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:text-white"
                        >
                            <Zap className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p className="text-gray-500">
                    © 2024 AutoBot. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;