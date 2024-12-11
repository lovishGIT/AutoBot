import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clipboard, Plus, X } from 'lucide-react';
import * as z from 'zod';

import { useTicket } from '@/context/tickets.context';

// Validation schema for ticket creation
const ticketSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().optional(),
    status: z
        .enum(['open', 'in-progress', 'completed'])
        .default('open'),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
    assignee: z.string().optional(),
});

const ProjectTickets = ({ projectId }) => {
    const { tickets, isLoading, error, createTicket } = useTicket();
    const [isAddTicketDialogOpen, setIsAddTicketDialogOpen] =
        useState(false);
    const [formErrors, setFormErrors] = useState({});

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Collect form data directly from the form
        const formData = {
            title: e.target.elements.title.value,
            description: e.target.elements.description.value,
            status: e.target.elements.status.value,
            priority: e.target.elements.priority.value,
            assignee: e.target.elements.assignee.value,
        };

        try {
            // Validate form data
            const result = ticketSchema.safeParse(formData);

            if (!result.success) {
                // Convert zod errors to a more readable format
                const errors = result.error.errors.reduce(
                    (acc, err) => {
                        acc[err.path[0]] = err.message;
                        return acc;
                    },
                    {}
                );

                setFormErrors(errors);
                return;
            }

            // Clear previous errors
            setFormErrors({});

            // Create ticket
            await createTicket(formData);

            // Reset form and close dialog
            e.target.reset();
            setIsAddTicketDialogOpen(false);
        } catch (err) {
            console.error('Ticket creation failed', err);
        }
    };

    // Ticket Creation Dialog
    const AddTicketDialog = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Create New Ticket
                    </h2>
                    <button
                        onClick={() =>
                            setIsAddTicketDialogOpen(false)
                        }
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md"
                            placeholder="Enter ticket title"
                        />
                        {formErrors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {formErrors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md"
                            placeholder="Optional description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                defaultValue="open"
                                className="w-full px-3 py-2 bg-gray-600 text-white rounded-md"
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">
                                    In Progress
                                </option>
                                <option value="completed">
                                    Completed
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Priority
                            </label>
                            <select
                                name="priority"
                                defaultValue="medium"
                                className="w-full px-3 py-2 bg-gray-600 text-white rounded-md"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Assignee (Optional)
                        </label>
                        <input
                            type="text"
                            name="assignee"
                            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md"
                            placeholder="Assignee name"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                    >
                        Create Ticket
                    </button>
                </form>
            </div>
        </div>
    );

    // Rest of the component remains the same as in the previous version
    return (
        <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                    <Clipboard className="mr-2 text-teal-500" />
                    Project Tickets
                </h2>
                <button
                    onClick={() => setIsAddTicketDialogOpen(true)}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Ticket
                </button>
            </div>

            {/* Ticket list rendering remains the same */}
            {isLoading ? (
                <p className="text-gray-500">Loading tickets...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : tickets.length > 0 ? (
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket._id}
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
                                    {ticket.assignee && (
                                        <span>
                                            Assigned to:{' '}
                                            {ticket.assignee}
                                        </span>
                                    )}
                                    <span
                                        className={`ml-2 ${getPriorityColor(
                                            ticket.priority
                                        )}`}
                                    >
                                        Priority: {ticket.priority}
                                    </span>
                                </div>
                                {ticket.createdAt && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Created:{' '}
                                        {new Date(
                                            ticket.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                            <Link
                                to={`/tickets/${ticket._id}`}
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

            {/* Render dialog when open */}
            {isAddTicketDialogOpen && <AddTicketDialog />}
        </div>
    );
};

export default ProjectTickets;
