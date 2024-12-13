import React from 'react';
import { Folder } from 'lucide-react';

export const ProjectBasicInfo = ({
    name,
    description,
    onInputChange,
}) => {
    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300 mb-2 flex items-center"
                >
                    <Folder className="mr-2 text-blue-500" />
                    Project Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    Project Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={onInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project"
                    rows={4}
                />
            </div>
        </>
    );
};
