import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

export const TicketContext = createContext({
    tickets: [],
    fetchProjectTickets: () => {},
    createTicket: () => {},
    updateTicket: () => {},
    deleteTicket: () => {},
    getTicketById: () => {},
    isLoading: false,
    error: null,
});

const API_BASE_URL =
    (import.meta.env.VITE_API_URL || 'http://localhost:4000') +
    '/api/projects';

export const TicketProvider = ({ projectId, children }) => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ticketsFetched, setTicketsFetched] = useState(false);

    const { isAuthenticated } = useAuth();

    // Memoized fetch tickets function
    const fetchProjectTickets = useCallback(async () => {
        if (!projectId || isLoading || ticketsFetched) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${projectId}/tickets`,
                { withCredentials: true }
            );

            setTickets(response.data);
            setTicketsFetched(true);
        } catch (err) {
            console.error('Failed to fetch project tickets', err);
            setError(
                err.response?.data?.message ||
                    'Error fetching project tickets'
            );
            toast.error('Failed to load tickets');
        } finally {
            setIsLoading(false);
        }
    }, [projectId, isLoading, ticketsFetched]);

    // Fetch tickets when authenticated and project ID exists
    useEffect(() => {
        if (isAuthenticated && projectId && !ticketsFetched) {
            fetchProjectTickets();
        }
    }, [
        isAuthenticated,
        projectId,
        ticketsFetched,
        fetchProjectTickets,
    ]);

    // Get ticket by ID
    const getTicketById = async (ticketId) => {
        if (!projectId || !ticketId) {
            setError('No project or ticket ID provided');
            return null;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${projectId}/tickets/${ticketId}`,
                { withCredentials: true }
            );

            return response.data;
        } catch (err) {
            console.error(`Failed to fetch ticket ${ticketId}`, err);
            setError(
                err.response?.data?.message ||
                    'Error fetching ticket details'
            );
            toast.error('Failed to load ticket details');
        } finally {
            setIsLoading(false);
        }
    };

    // Create a new ticket
    const createTicket = async (ticketData) => {
        if (!projectId) {
            setError('No project ID provided');
            return null;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/${projectId}/tickets`,
                ticketData,
                { withCredentials: true }
            );

            // Update local state
            setTickets((prevTickets) => [
                ...prevTickets,
                response.data,
            ]);

            toast.success('Ticket created successfully!');
            return response.data;
        } catch (err) {
            console.error('Failed to create ticket', err);
            setError(
                err.response?.data?.message || 'Error creating ticket'
            );
            toast.error('Failed to create ticket');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Update a ticket
    const updateTicket = async (ticketId, updatedData) => {
        if (!projectId || !ticketId) {
            setError('No project or ticket ID provided');
            return null;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/${projectId}/tickets/${ticketId}`,
                updatedData,
                { withCredentials: true }
            );

            // Update local state
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket._id === ticketId
                        ? { ...ticket, ...response.data }
                        : ticket
                )
            );

            toast.success('Ticket updated successfully!');
            return response.data;
        } catch (err) {
            console.error('Failed to update ticket', err);
            setError(
                err.response?.data?.message || 'Error updating ticket'
            );
            toast.error('Failed to update ticket');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a ticket
    const deleteTicket = async (ticketId) => {
        if (!projectId || !ticketId) {
            setError('No project or ticket ID provided');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await axios.delete(
                `${API_BASE_URL}/${projectId}/tickets/${ticketId}`,
                { withCredentials: true }
            );

            // Update local state
            setTickets((prevTickets) =>
                prevTickets.filter(
                    (ticket) => ticket._id !== ticketId
                )
            );

            toast.info('Ticket deleted successfully!');
        } catch (err) {
            console.error('Failed to delete ticket', err);
            setError(
                err.response?.data?.message || 'Error deleting ticket'
            );
            toast.error('Failed to delete ticket');
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        tickets,
        fetchProjectTickets,
        createTicket,
        updateTicket,
        deleteTicket,
        getTicketById,
        isLoading,
        error,
    };

    return (
        <TicketContext.Provider value={contextValue}>
            {children}
        </TicketContext.Provider>
    );
};