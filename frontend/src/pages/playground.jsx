import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/defaultLayout';
import { DayComponent } from '../components/Playground/DayTickets';

const initialTickets = [
    {
        id: 1,
        title: 'Frontend',
        date: 1,
        description: 'Do the frontend',
        status: 'Pending',
        user: ['111@111', 'lovish'],
    },
    {
        id: 2,
        title: 'Backend',
        date: 1,
        description: 'Do the backend',
        status: 'Done',
        user: ['123@123'],
    },
    {
        id: 3,
        title: 'Testing',
        date: 2,
        description: 'Do the testing',
        status: 'Pending',
        user: ['221@221'],
    },
    {
        id: 4,
        title: 'Permissions',
        date: 2,
        description: 'Take the permissions',
        status: 'Pending',
        user: ['111@111', 'lavish', 'janvi', 'lovish'],
    },
    {
        id: 5,
        title: 'Deployment',
        date: 3,
        description: 'Do the deploy',
        status: 'Cancelled',
        user: ['222@222'],
    },
];

const AddTicketForm = ({ onSubmit, onCancel }) => {
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        date: '',
        status: 'Pending',
        user: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(ticket);
        setTicket({
            title: '',
            description: '',
            date: '',
            status: 'Pending',
            user: '',
        });
    };

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        Add New Ticket
                    </h3>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    value={ticket.title}
                    onChange={(e) =>
                        setTicket({
                            ...ticket,
                            title: e.target.value,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    placeholder="Day (e.g., 1, 2, 3)"
                    value={ticket.date}
                    onChange={(e) =>
                        setTicket({ ...ticket, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="text"
                    placeholder="Users (comma separated)"
                    value={ticket.user}
                    onChange={(e) =>
                        setTicket({ ...ticket, user: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Add Ticket
                </button>
            </form>
        </div>
    );
};

export default function Playground() {
    const [groupedTickets, setGroupedTickets] = useState({});
    const [tickets, setTickets] = useState(initialTickets);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const groupedData = tickets.reduce((acc, ticket) => {
            acc[ticket.date] = acc[ticket.date] || [];
            acc[ticket.date].push(ticket);
            return acc;
        }, {});
        setGroupedTickets(groupedData);
    }, [tickets]);

    const handleAddTicket = (newTicket) => {
        console.log(newTicket.user);

        const updatedTickets = [
            ...tickets,
            {
                ...newTicket,
                id: tickets.length + 1,
                user: newTicket.user.map((u) => u.trim()),
            },
        ];
        setTickets(updatedTickets);
        setShowAddForm(false);
    };

    const handleDeleteTicket = (id) => {
        const updatedTickets = tickets.filter(
            (ticket) => ticket.id !== id
        );
        setTickets(updatedTickets);
    };

    return (
        <DefaultLayout>
            <div className="w-full max-w-7xl px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Ticket Management
                    </h1>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <span>+</span>
                        Add New Ticket
                    </button>
                </div>

                {/* Add Ticket Form */}
                {showAddForm && (
                    <div className="mb-6 flex justify-center">
                        <AddTicketForm
                            onSubmit={handleAddTicket}
                            onCancel={() => setShowAddForm(false)}
                        />
                    </div>
                )}

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(groupedTickets).map(
                        ([date, dayTickets]) => (
                            <DayComponent
                                key={date}
                                date={date}
                                tickets={dayTickets}
                                handleDeleteTicket={
                                    handleDeleteTicket
                                }
                                handleAddTicket={(newTicket) =>
                                    handleAddTicket({
                                        ...newTicket,
                                        date,
                                    })
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
