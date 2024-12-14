import { useContext } from 'react';
import { TicketContext } from '@/context/tickets.context';

export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
