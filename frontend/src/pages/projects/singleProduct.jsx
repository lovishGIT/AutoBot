import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Folder,
    Calendar,
    Users,
    Link as LinkIcon,
    FileText,
    Activity,
} from 'lucide-react';
import { useProject } from '@/context/projects.context';
import ProjectTickets from '@/components/Project/ProjectTickets';

const SingleProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProjectById, deleteProject, updateProject } =
        useProject();

    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const projectData = await getProjectById(id);
                setProject(projectData);
                setEditedProject(projectData);
            } catch (error) {
                console.error('Failed to fetch project', error);
                navigate('/projects');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id, getProjectById, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveProject = async () => {
        try {
            const updatedProject = await updateProject(
                id,
                editedProject
            );
            setProject(updatedProject);
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
                navigate('/projects');
            } catch (error) {
                console.error('Failed to delete project', error);
            }
        }
    };

    const handleBackButton = () => {
        navigate('/projects');
    };

    if (isLoading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                Project not found
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
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
                                value={editedProject.name}
                                onChange={handleInputChange}
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
                                    onClick={handleSaveProject}
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
                                    onClick={() => setIsEditing(true)}
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
                    {/* Project Details Column */}
                    <div className="md:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Folder className="mr-2 text-blue-500" />
                            Project Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Description
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="description"
                                        value={
                                            editedProject.description ||
                                            ''
                                        }
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2"
                                        rows="4"
                                    />
                                ) : (
                                    <p className="text-white">
                                        {project.description ||
                                            'No description provided'}
                                    </p>
                                )}
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
                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={editedProject.status}
                                        onChange={handleInputChange}
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
                                ) : (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs uppercase
                                            ${
                                                project.status ===
                                                'active'
                                                    ? 'bg-green-600'
                                                    : project.status ===
                                                      'completed'
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-600'
                                            }`}
                                    >
                                        {project.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resources and Links Column */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <LinkIcon className="mr-2 text-yellow-500" />
                            Resources & Links
                        </h2>

                        {isEditing ? (
                            <div className="space-y-2">
                                <textarea
                                    name="resources"
                                    value={(
                                        project.resources || []
                                    ).join('\n')}
                                    onChange={(e) => {
                                        const resources =
                                            e.target.value
                                                .split('\n')
                                                .filter(
                                                    (r) =>
                                                        r.trim() !==
                                                        ''
                                                );
                                        setEditedProject((prev) => ({
                                            ...prev,
                                            resources,
                                        }));
                                    }}
                                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2"
                                    placeholder="Enter resources (one per line)"
                                    rows="4"
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {project.resources &&
                                project.resources.length > 0 ? (
                                    project.resources.map(
                                        (resource, index) => (
                                            <a
                                                key={index}
                                                href={resource}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block bg-gray-700 hover:bg-gray-600 text-blue-400 hover:text-blue-300 rounded-md px-3 py-2 truncate"
                                            >
                                                {resource}
                                            </a>
                                        )
                                    )
                                ) : (
                                    <p className="text-gray-500">
                                        No resources added
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Activity Section */}
                <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <FileText className="mr-2 text-indigo-500" />
                        Project Activities
                    </h2>

                    {project.activities &&
                    project.activities.length > 0 ? (
                        <ul className="space-y-2">
                            {project.activities.map(
                                (activity, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-700 rounded-md px-4 py-3"
                                    >
                                        {activity}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500">
                            No activities recorded
                        </p>
                    )}
                </div>

                <ProjectTickets projectId={id} />
            </div>
        </div>
    );
};

export default SingleProjectPage;
