import React from 'react';
import DefaultLayout from '../layouts/defaultLayout';
import HeroSection from '../components/Home/master';
import FeaturesSection from '../components/Home/features';
import TestimonialSection from '../components/Home/testimonial';

export default function Home() {

    return (
        <div className="bg-gray-900 min-h-screen">
            <DefaultLayout>
                <HeroSection />
                <FeaturesSection />
                <TestimonialSection />
            </DefaultLayout>
        </div>
    );
}
