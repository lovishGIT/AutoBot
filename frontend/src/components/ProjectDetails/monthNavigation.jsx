import React from 'react';
import { useProject } from '@/hooks/project.hook';

const MonthNavigation = () => {
    const {
        selectedMonth,
        selectedYear,
        setSelectedMonth,
        setSelectedYear,
    } = useProject();

    const changeMonth = (increment) => {
        const newDate = new Date(
            selectedYear,
            selectedMonth + increment
        );
        setSelectedMonth(newDate.getMonth());
        setSelectedYear(newDate.getFullYear());
    };

    return (
        <div className="flex justify-between items-center mb-4 text-white">
            <button
                onClick={() => changeMonth(-1)}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
            >
                Previous
            </button>

            <h2 className="text-xl font-bold">
                {new Date(selectedYear, selectedMonth).toLocaleString(
                    'default',
                    { month: 'long', year: 'numeric' }
                )}
            </h2>

            <button
                onClick={() => changeMonth(1)}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default MonthNavigation;
