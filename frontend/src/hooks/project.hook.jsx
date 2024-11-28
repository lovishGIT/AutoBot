import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const API_URL = import.meta.env.API_URL;
    const { id: projectId } = useParams();
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth()
    );
    const [selectedYear, setSelectedYear] = useState(
        new Date().getFullYear()
    );
    const [calendarDays, setCalendarDays] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [projectDetails, setProjectDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddTicketModalOpen, setIsAddTicketModalOpen] =
        useState(false);

    // Utility function to generate calendar days
    const generateCalendarDays = (year, month) => {
        const days = [];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Previous month padding
        const prevMonthLastDay = new Date(year, month, 0);
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push({
                date: new Date(
                    year,
                    month - 1,
                    prevMonthLastDay.getDate() -
                        firstDay.getDay() +
                        i +
                        1
                ),
                tickets: [],
            });
        }

        // Current month days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({
                date: new Date(year, month, i),
                tickets: [],
            });
        }

        return days;
    };

    // Fetch project details and tickets
    useEffect(() => {
        const fetchProjectAndTickets = async () => {
            try {
                setIsLoading(true);

                // Fetch project details
                const projectResponse = await axios.get(
                    `${API_URL}/api/projects/${projectId}`,
                    {
                        withCredentials: true,
                    }
                );
                setProjectDetails(projectResponse.data);

                // Fetch tickets for this project
                const ticketsResponse = await axios.get(
                    `${API_URL}/api/tickets/project/${projectId}`,
                    {
                        withCredentials: true,
                    }
                );
                setTickets(ticketsResponse.data);

                // Generate calendar with tickets
                const days = generateCalendarDays(
                    selectedYear,
                    selectedMonth
                );
                const updatedDays = days.map((day) => ({
                    ...day,
                    tickets: ticketsResponse.data.filter(
                        (ticket) =>
                            new Date(
                                ticket.dueDate
                            ).toDateString() ===
                            day.date.toDateString()
                    ),
                }));

                setCalendarDays(updatedDays);
                setIsLoading(false);
            } catch (error) {
                toast.error(
                    'Failed to fetch project details or tickets'
                );
                setIsLoading(false);
            }
        };

        fetchProjectAndTickets();
    }, [projectId, selectedMonth, selectedYear]);

    // Add ticket handler
    const handleAddTicket = async (ticketData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.API_URL}/api/tickets/`, {
                    ...ticketData,
                    projectId: projectId,
                }, {
                    withCredentials: true,
                }
            );

            // Update tickets state
            setTickets([...tickets, response.data]);
            setIsAddTicketModalOpen(false);

            toast.success('Ticket created successfully');
            return response.data;
        } catch (error) {
            toast.error('Failed to create ticket');
            throw error;
        }
    };

    const contextValue = {
        projectId,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        calendarDays,
        setCalendarDays,
        tickets,
        setTickets,
        selectedTicket,
        setSelectedTicket,
        projectDetails,
        isLoading,
        isAddTicketModalOpen,
        setIsAddTicketModalOpen,
        handleAddTicket,
        generateCalendarDays,
    };

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};


export const useProject = () => {
    return useContext(ProjectContext);
}