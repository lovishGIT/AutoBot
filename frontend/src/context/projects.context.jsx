import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from './user.context';
import { useNavigate } from 'react-router-dom';

// Create the ProjectContext
export const ProjectContext = createContext({
    projects: [],
    fetchProjects: () => {},
    createProject: () => {},
    updateProject: () => {},
    deleteProject: () => {},
    getProjectById: () => {},
    isLoading: false,
    error: null,
});

const API_BASE_URL =
    (import.meta.env.VITE_API_URL || 'http://localhost:4000') +
    '/api/projects';

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            setError('You need to login to view projects');
            navigate('/login', { replace: true });
        } else {
            fetchProjects();
        }
    }, [user]);


    // Fetch all user projects
    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        // const token = localStorage.getItem('token');
        try {
            const response = await axios.get(API_BASE_URL, {
                withCredentials: true,
            });
            console.log('Fetched projects', response.data);

            setProjects(response.data);
        } catch (err) {
            console.error('Failed to fetch projects', err);
            setError(
                err.response?.data?.message ||
                    'Error fetching projects'
            );
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch project by ID
    const getProjectById = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${id}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (err) {
            console.error(
                `Failed to fetch project with ID ${id}`,
                err
            );
            setError(
                err.response?.data?.message ||
                    'Error fetching project'
            );
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Create a new project
    const createProject = async (projectData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                API_BASE_URL,
                projectData,
                {
                    headers: {
                        // Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                }
            );
            setProjects((prev) => [...prev, response.data]);
            toast.success('Project created successfully!');
            return response.data;
        } catch (err) {
            console.error('Failed to create project', err);
            setError(
                err.response?.data?.message ||
                    'Error creating project'
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Update a project
    const updateProject = async (id, updatedData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/${id}`,
                updatedData,
                {
                    withCredentials: true,
                }
            );
            setProjects((prev) =>
                prev.map((project) =>
                    project._id === id
                        ? { ...project, ...response.data }
                        : project
                )
            );
            toast.success('Project updated successfully!');
            return response.data;
        } catch (err) {
            console.error('Failed to update project', err);
            setError(
                err.response?.data?.message ||
                    'Error updating project'
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a project
    const deleteProject = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE_URL}/${id}`, {
                withCredentials: true,
            });
            setProjects((prev) =>
                prev.filter((project) => project._id !== id)
            );
            toast.info('Project deleted successfully!');
        } catch (err) {
            console.error('Failed to delete project', err);
            setError(
                err.response?.data?.message ||
                    'Error deleting project'
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Context value
    const contextValue = {
        projects,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        getProjectById,
        isLoading,
        error,
    };

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};

// Hook to use ProjectContext
export const useProject = () => useContext(ProjectContext);
