import React, { Suspense, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Folder,
    Calendar,
    Link as LinkIcon,
    Activity,
} from 'lucide-react';
import { useProjects } from '@/hooks/useProject';
import ProjectTickets from '@/components/Project/id/ProjectTickets';
import { TicketProvider } from '@/context/tickets.context';
import ProjectSidebar from '@/components/Project/projectSidebar';
import { toast } from 'react-toastify';

const SingleProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects, deleteProject, updateProject, isLoading } =
        useProjects();

    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch project details once
    useEffect(() => {
        if (!projects || projects.length <= 0) {
            navigate('/projects');
            return;
        }

        const selectedProject = projects.find(
            (proj) => proj._id === id
        );
        if (!selectedProject) {
            toast.error('Project Not Found');
            navigate('/projects');
        } else {
            setProject(selectedProject);
        }
    }, [id, projects, navigate]);

    // Handle form submission for updates
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedProject = {
            name: formData.get('name'),
            description: formData.get('description'),
            status: formData.get('status'),
            resources: formData
                .get('resources')
                ?.split('\n')
                .map((r) => r.trim())
                .filter(Boolean),
        };

        try {
            const updatedProjectData = await updateProject(
                id,
                updatedProject
            );
            setProject(updatedProjectData);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update project', error);
        }
    };

    const handleDeleteProject = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this project?'
        );
        if (confirmDelete) {
            try {
                await deleteProject(id);
                navigate('/projects', { replace: true });
            } catch (error) {
                console.error('Failed to delete project', error);
            }
        }
    };

    const handleBackButton = () => navigate('/projects');

    if (isLoading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!project) {
        return null; // Prevents rendering if no project exists
    }

    return (
        <TicketProvider projectId={id}>
            <ProjectSidebar />
            <div className="bg-gray-900 text-white min-h-screen p-8 pl-40">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 flex items-center">
                            <button
                                className="mr-4"
                                onClick={handleBackButton}
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={project.name}
                                    className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1"
                                />
                            ) : (
                                project.name
                            )}
                        </h1>
                        <div className="flex space-x-2">
                            {isEditing ? (
                                <>
                                    <button
                                        type="submit"
                                        form="projectForm"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() =>
                                            setIsEditing(false)
                                        }
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            setIsEditing(true)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        <Edit className="mr-2 w-4 h-4" />{' '}
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDeleteProject}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        <Trash2 className="mr-2 w-4 h-4" />{' '}
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <Folder className="mr-2 text-blue-500" />
                                Project Details
                            </h2>
                            <form
                                id="projectForm"
                                onSubmit={handleFormSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        defaultValue={
                                            project.description || ''
                                        }
                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-400 mb-1 flex items-center">
                                        <Calendar className="mr-2 w-4 h-4 text-green-500" />
                                        Created At
                                    </label>
                                    <p className="text-white">
                                        {new Date(
                                            project.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-400 mb-1 flex items-center">
                                        <Activity className="mr-2 w-4 h-4 text-purple-500" />
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        defaultValue={project.status}
                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2"
                                    >
                                        <option value="active">
                                            Active
                                        </option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <LinkIcon className="mr-2 text-yellow-500" />
                                Resources & Links
                            </h2>
                            <div className="space-y-2">
                                {project.resources &&
                                project.resources.length > 0 ? (
                                    project.resources.map(
                                        (resource, index) => {
                                            // Check if the resource has a 'url' key, implying it's an image
                                            if (resource.url) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="space-y-2"
                                                    >
                                                        <a href={resource.url} target='_blank'>
                                                            <img
                                                                src={
                                                                    resource.url
                                                                }
                                                                alt={`Resource ${index}`}
                                                                className="w-32 h-32 rounded-md"
                                                            />
                                                        </a>
                                                    </div>
                                                );
                                            } else if (
                                                resource.text
                                            ) {
                                                // If the resource has a 'text' key, render it as text
                                                return (
                                                    <div
                                                        key={index}
                                                        className="space-y-2"
                                                    >
                                                        <p className="text-white">
                                                            {
                                                                resource.text
                                                            }
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        }
                                    )
                                ) : (
                                    <p className="text-white">
                                        No resources provided
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Suspense
                        fallback={<div>Loading tickets...</div>}
                    >
                        <ProjectTickets projectId={id} />
                    </Suspense>
                </div>
            </div>
        </TicketProvider>
    );
};

export default SingleProjectPage;
