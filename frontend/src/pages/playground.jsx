import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layouts/defaultLayout';
import { DayComponent } from '../components/Playground/DayTickets';

const sampleTickets = [
    {
        title: 'Frontend',
        date: 1,
        description: 'do the frontend',
        status: 'Pending',
        user: ['111@111', 'lovish'],
    },
    {
        title: 'backend',
        date: 1,
        description: 'do the backend',
        status: 'Done',
        user: ['123@123'],
    },
    {
        title: 'testing',
        date: 2,
        description: 'do the testing',
        status: 'Pending',
        user: ['221@221'],
    },
    {
        title: 'permissions',
        date: 2,
        description: 'Take the permissions',
        status: 'Pending',
        user: ['111@111', 'lavish', 'janvi', 'lovish'],
    },
    {
        title: 'Deployment',
        date: 3,
        description: 'do the deploy',
        status: 'cancelled',
        user: ['222@222'],
    },
    {
        title: 'Deployment',
        date: 3,
        description: 'do the deploy',
        status: 'Pending',
        user: ['111@111'],
    },
];

export default function Playground() {
    const [groupedTickets, setGroupedTickets] = useState({});

    useEffect(() => {
        const groupedData = sampleTickets.reduce((acc, ticket) => {
            acc[ticket.date] = acc[ticket.date] || [];
            acc[ticket.date].push(ticket);
            return acc;
        }, {});
        setGroupedTickets(groupedData);
    }, []);

    return (
        <DefaultLayout>
            <div>
                <div className="w-[100%] flex">
                    {Object.entries(groupedTickets).map(
                        ([date, tickets], index) => (
                            <DayComponent
                                key={index}
                                date={date}
                                tickets={tickets}
                            />
                        )
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
