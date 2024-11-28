import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProject } from '@/hooks/project.hook';

const AddTicketModal = () => {
    const {
        isAddTicketModalOpen,
        setIsAddTicketModalOpen,
        handleAddTicket,
    } = useProject();

    const [newTicket, setNewTicket] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleAddTicket(newTicket);

            // Reset form
            setNewTicket({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: '',
            });
        } catch (error) {
            // Error handling.
            console.error(error);
        }
    };

    const renderModalTrigger = () => (
        <button
            onClick={() => setIsAddTicketModalOpen(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
            <Plus className="mr-2" size={20} />
            Add Ticket
        </button>
    );

    if (!isAddTicketModalOpen) {
        return renderModalTrigger();
    }

    return (
        <>
            {renderModalTrigger()}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">
                        Create New Ticket
                    </h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Ticket Title"
                            value={newTicket.title}
                            onChange={(e) =>
                                setNewTicket({
                                    ...newTicket,
                                    title: e.target.value,
                                })
                            }
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newTicket.description}
                            onChange={(e) =>
                                setNewTicket({
                                    ...newTicket,
                                    description: e.target.value,
                                })
                            }
                            className="w-full p-2 bg-gray-700 rounded"
                            rows="4"
                        />
                        <select
                            value={newTicket.priority}
                            onChange={(e) =>
                                setNewTicket({
                                    ...newTicket,
                                    priority: e.target.value,
                                })
                            }
                            className="w-full p-2 bg-gray-700 rounded"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">
                                Medium Priority
                            </option>
                            <option value="high">
                                High Priority
                            </option>
                        </select>
                        <input
                            type="date"
                            value={newTicket.dueDate}
                            onChange={(e) =>
                                setNewTicket({
                                    ...newTicket,
                                    dueDate: e.target.value,
                                })
                            }
                            className="w-full p-2 bg-gray-700 rounded"
                            required
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsAddTicketModalOpen(false)
                                }
                                className="bg-gray-600 hover:bg-gray-500 p-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                            >
                                Create Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTicketModal;
