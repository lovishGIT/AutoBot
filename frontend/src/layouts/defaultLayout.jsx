import React from 'react';
import Footer from "../components/Global/footer";
import Navbar from "../components/Global/navbar";

export default function DefaultLayout({children}) {
    return (
        <div>
            <Navbar />
                <div className="flex flex-col justify-center items-center space-y-4 p-4">
                    {children}
                </div>
            <Footer />
        </div>
    );
}
