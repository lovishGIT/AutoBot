import React from 'react'
import MasterHome from "../components/Home/master";
import DefaultLayout from "../layouts/defaultLayout";
import TestimonialSlider from '../components/Home/testimonial';

export default function Home() {
    return (
        <DefaultLayout>
            <div className="text-2xl w-[80%] font-suse">
                <h1>Welcome back, Lovish!</h1>
            </div>
            <MasterHome />
            <TestimonialSlider />
        </DefaultLayout>
    );
}
