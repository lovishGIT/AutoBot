import React from 'react';
import { useProject } from '@/hooks/project.hook';
import MonthNavigation from './monthNavigation';

const ProjectCalendar = () => {
    const { calendarDays, selectedMonth, setSelectedTicket } =
        useProject();

    return (
        <div>
            <MonthNavigation />
            <div className="grid grid-cols-7 gap-2 bg-gray-900 p-4 rounded-lg">
                {[
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                ].map((day) => (
                    <div
                        key={day}
                        className="text-center text-gray-400 font-bold"
                    >
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`
                            p-2 border border-gray-700 rounded min-h-[120px]
                            ${
                                day.date.getMonth() !== selectedMonth
                                    ? 'bg-gray-800 opacity-50'
                                    : 'bg-gray-800'
                            }
                        `}
                    >
                        <div className="text-sm text-gray-500 mb-2">
                            {day.date.getDate()}
                        </div>

                        {day.tickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                className={`
                                    cursor-pointer p-1 rounded mb-1 text-xs
                                    ${
                                        ticket.priority === 'high'
                                            ? 'bg-red-700 text-white'
                                            : ticket.priority === 'medium'
                                            ? 'bg-yellow-700 text-white'
                                            : 'bg-green-700 text-white'
                                    }
                                `}
                                onClick={() =>
                                    setSelectedTicket(ticket)
                                }
                            >
                                {ticket.title}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectCalendar;
