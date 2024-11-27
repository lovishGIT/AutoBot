import React from 'react';

const TestimonialSection = () => {
    const testimonials = [
        {
            name: 'John Doe',
            quote: "AutoBot revolutionized our workflow. It's like having a team of productivity experts!",
            role: 'CEO, TechInnovate',
        },
        {
            name: 'Jane Smith',
            quote: 'Incredible tool that saves us hours every week. Highly recommended for any serious business.',
            role: 'COO, GlobalSolutions',
        },
        {
            name: 'Mike Johnson',
            quote: "The most intelligent automation platform I've ever used. Game-changer for our operations.",
            role: 'CTO, StartupLabs',
        },
    ];

    return (
        <div className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real stories from businesses that transformed
                        their productivity with AutoBot.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition transform"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                            </div>
                            <p className="text-gray-300 italic mb-4">
                                {testimonial.quote}
                            </p>
                            <div>
                                <p className="text-white font-semibold">
                                    {testimonial.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;