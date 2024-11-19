import React, { useState } from 'react';
import AddTicketForm from './addTicketForm';

const Ticket = ({
    id,
    title,
    description,
    status,
    user,
    handleDeleteTicket,
}) => {
    let statusEmoji =
        status.toLowerCase() === 'pending' ? '⏳' : '✅';
    statusEmoji =
        status.toLowerCase() === 'cancelled' ? '❌' : statusEmoji;

    return (
        <div
            className={`
            w-full bg-white rounded-lg shadow-sm p-4 mb-4
            ${
                status.toLowerCase() === 'cancelled'
                    ? 'opacity-50'
                    : ''
            }
            transition-all duration-200 hover:shadow-md
        `}
        >
            <div className="mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    {title} <span>{statusEmoji}</span>
                </h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    {user.slice(0, 2).map((_, index) => (
                        <div
                            key={index}
                            className={`
                                w-6 h-6 rounded-full
                                ${
                                    index === 0
                                        ? 'bg-[#081547]'
                                        : 'bg-[#1b540a]'
                                }
                                ${index > 0 ? '-ml-2' : ''}
                                ring-2 ring-white
                            `}
                        />
                    ))}
                    {user.length > 2 && (
                        <span className="text-sm text-gray-600 ml-1">
                            +{user.length - 2}
                        </span>
                    )}
                </div>

                <button
                    onClick={() => handleDeleteTicket(id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete ticket"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export const DayComponent = ({
    date,
    tickets,
    handleDeleteTicket,
    handleAddTicket,
}) => {
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <div className="border rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Day {date}</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                    <span>+</span>
                    Add Ticket
                </button>
            </div>

            {showAddForm && (
                <div className="mb-4">
                    <AddTicketForm
                        onSubmit={(ticket) => {
                            handleAddTicket(ticket);
                            setShowAddForm(false);
                        }}
                        onCancel={() => setShowAddForm(false)}
                        date={date}
                    />
                </div>
            )}

            <div>
                {tickets.map((ticket) => (
                    <Ticket
                        key={ticket.id}
                        {...ticket}
                        handleDeleteTicket={handleDeleteTicket}
                    />
                ))}
            </div>
        </div>
    );
};

export default DayComponent;
