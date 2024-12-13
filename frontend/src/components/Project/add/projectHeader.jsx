import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PageHeader = ({
    onBackClick,
    title
}) => {
    return (
        <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center">
            <button className="mr-4" onClick={onBackClick}>
                <ArrowLeft className="w-6 h-6" />
            </button>
            {title}
        </h1>
    );
};
