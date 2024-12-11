import { FileText } from 'lucide-react';
import React from 'react';

export default function ProjectActivity({ activities }) {
    return (
        <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="mr-2 text-indigo-500" />
                Project Activities
            </h2>

            {activities && activities.length > 0 ? (
                <ul className="space-y-2">
                    {activities.map((activity, index) => (
                        <li
                            key={index}
                            className="bg-gray-700 rounded-md px-4 py-3"
                        >
                            {activity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">
                    No activities recorded
                </p>
            )}
        </div>
    );
}
