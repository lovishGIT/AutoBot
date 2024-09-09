import React from 'react';
import { Link } from 'react-router-dom';

export default function MasterHome() {
    return (
        <>
            <div className="w-[80%] h-[30vh] bg-gradient-to-r from-[#43D8C9] via-[#042d76] to-[#7a0cf8] flex justify-center items-center rounded-lg">
                <div className="w-[99%] h-[28vh] flex flex-col gap-y-6 justify-center items-center bg-white rounded-lg">
                    <div className="text-black text-6xl font-suse">
                        Automate Your Workflow!
                    </div>
                    <Link
                        to="/playground"
                        className="bg-gradient-to-r from-[#43D8C9] to-[#042d76] text-white px-4 py-2 rounded-lg transition-all hover:scale-105">
                        Explore The Tool
                    </Link>
                </div>
            </div>
        </>
    );
}
