import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddTicketForm = ({ onSubmit, onCancel, date }) => {
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        status: 'Pending',
        user: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...ticket,
            user: ticket.user
                .split(',')
                .map((u) => u.trim())
                .filter(Boolean),
        });
        setTicket({
            title: '',
            description: '',
            status: 'Pending',
            user: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold">New Ticket</h4>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X size={16} />
                </button>
            </div>

            <input
                type="text"
                placeholder="Title"
                value={ticket.title}
                onChange={(e) =>
                    setTicket({ ...ticket, title: e.target.value })
                }
                className="w-full px-2 py-1 text-sm border rounded"
                required
            />

            <input
                type="text"
                placeholder="Description"
                value={ticket.description}
                onChange={(e) =>
                    setTicket({
                        ...ticket,
                        description: e.target.value,
                    })
                }
                className="w-full px-2 py-1 text-sm border rounded"
                required
            />

            <input
                type="text"
                placeholder="Users (comma separated)"
                value={ticket.user}
                onChange={(e) =>
                    setTicket({ ...ticket, user: e.target.value })
                }
                className="w-full px-2 py-1 text-sm border rounded"
                required
            />

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Ticket
                </button>
            </div>
        </form>
    );
};

export default AddTicketForm;
