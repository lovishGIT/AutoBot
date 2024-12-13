import React from 'react';
import { Link2 } from 'lucide-react';

export const ProjectLinkInput = ({
    link,
    onInputChange,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor="link"
                className="text-sm font-medium text-gray-300 mb-2 flex items-center"
            >
                <Link2 className="mr-2 text-green-500" />
                Project Link
            </label>
            <input
                type="text"
                id="link"
                name="link"
                value={link}
                onChange={onInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project link (comma separated)"
            />
        </div>
    );
};
