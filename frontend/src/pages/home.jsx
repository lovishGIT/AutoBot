import React, { useContext, useEffect } from 'react'
import MasterHome from "../components/Home/master";
import DefaultLayout from "../layouts/defaultLayout";
import TestimonialSlider from '../components/Home/testimonial';
import { UserContext } from '../context/user.context';
import { ToastContainer } from 'react-toastify';

export default function Home() {
    const { user } = useContext(UserContext);
    useEffect(() => {
        // console.log(user);
    }, [user]);
    return (
        <>
            <DefaultLayout>
                <div className="text-2xl w-[80%] font-suse">
                    <h1>{user.fullName ? `Welcome ${user.fullName}` : "Please Login"}</h1>
                </div>
                <MasterHome />
                <TestimonialSlider />
            </DefaultLayout>
            <ToastContainer
                position='bottom-right'
                theme='dark'
            />
        </>
    );
}
