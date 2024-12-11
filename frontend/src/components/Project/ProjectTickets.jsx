import React from 'react';
import { Link } from 'react-router-dom';
import { Clipboard } from 'lucide-react';

const ProjectTickets = ({ projectId }) => {
    // Sample tickets data
    const tickets = [
        {
            id: 1,
            title: 'Implement User Authentication',
            status: 'in-progress',
            priority: 'high',
            assignee: 'John Doe',
            createdAt: new Date('2024-02-15'),
        },
        {
            id: 2,
            title: 'Fix Mobile Responsive Issues',
            status: 'open',
            priority: 'medium',
            assignee: 'Jane Smith',
            createdAt: new Date('2024-02-10'),
        },
        {
            id: 3,
            title: 'Optimize Database Queries',
            status: 'completed',
            priority: 'low',
            assignee: 'Mike Johnson',
            createdAt: new Date('2024-01-25'),
        },
    ];

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'in-progress':
                return 'bg-yellow-600';
            case 'open':
                return 'bg-blue-600';
            case 'completed':
                return 'bg-green-600';
            default:
                return 'bg-gray-600';
        }
    };

    // Helper function to get priority color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clipboard className="mr-2 text-teal-500" />
                Project Tickets
            </h2>

            {tickets.length > 0 ? (
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-gray-700 rounded-md p-4 flex justify-between items-center"
                        >
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-medium text-white">
                                        {ticket.title}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs uppercase
                                            ${getStatusColor(
                                                ticket.status
                                            )}`}
                                    >
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                    <span>
                                        Assigned to: {ticket.assignee}
                                    </span>
                                    <span
                                        className={`ml-2 ${getPriorityColor(
                                            ticket.priority
                                        )}`}
                                    >
                                        Priority: {ticket.priority}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Created:{' '}
                                    {ticket.createdAt.toLocaleDateString()}
                                </p>
                            </div>
                            <Link
                                to={`/tickets/${ticket.id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">
                    No tickets found for this project
                </p>
            )}
        </div>
    );
};

export default ProjectTickets;
