import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ProjectStatusSelector = ({ status, onInputChange }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor="status"
                className="text-sm font-medium text-gray-300 mb-2 flex items-center"
            >
                <CheckCircle className="mr-2 text-yellow-500" />
                Project Status
            </label>
            <select
                id="status"
                name="status"
                value={status}
                onChange={onInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 capitalize"
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};
