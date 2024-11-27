import React from 'react'
import { Zap, Globe, Users } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: Zap,
            title: 'Rapid Automation',
            description:
                'Instantly create sophisticated workflows with our intuitive interface.',
        },
        {
            icon: Globe,
            title: 'Scalable Solutions',
            description:
                'From startups to enterprises, our platform adapts to your unique needs.',
        },
        {
            icon: Users,
            title: 'Collaborative Power',
            description:
                'Seamlessly integrate team workflows and enhance collective productivity.',
        },
    ];

    return (
        <div className="bg-gray-800 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Why Choose AutoBot?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Transform your operational efficiency with
                        intelligent automation that learns and adapts.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 p-6 rounded-lg text-center hover:scale-105 transition transform"
                        >
                            <feature.icon className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;