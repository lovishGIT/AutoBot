import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/user.hook';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const { user } = useUser();

    return (
        <div className="bg-gray-900 text-white pt-24 pb-16 h-[100vh] flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <h1 className="text-5xl font-bold mb-6 max-w-3xl">
                    {user?.fullName
                        ? `Welcome, ${user?.fullName}! Automate Your Workflow Effortlessly`
                        : 'Automate Your Workflow with Intelligent Precision'}
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                    {`Streamline your processes, boost productivity, and
                    unlock unprecedented efficiency with AutoBot's
                    cutting-edge automation solutions.`}
                </p>
                <Link
                    to="/projects"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-lg hover:scale-105 transition transform flex items-center"
                >
                    Explore The Tool <ArrowRight className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
