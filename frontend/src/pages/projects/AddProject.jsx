import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/context/projects.context';
import {
    ArrowLeft,
    Folder,
    Users,
    Calendar,
    CheckCircle,
} from 'lucide-react';

const AddProjectPage = () => {
    const navigate = useNavigate();
    const { createProject } = useProject();

    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        status: 'In Progress',
        deadline: '',
        team: 1,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]:
                name === 'team' || name === 'progress'
                    ? parseInt(value)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(projectData);
            navigate('/projects');
        } catch (error) {
            console.error('Failed to create project', error);
        }
    };

    const handleBackButton = () => {
        navigate('/projects');
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center">
                    <button
                        className="mr-4"
                        onClick={handleBackButton}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    Create New Project
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 rounded-lg p-8 shadow-lg"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                        >
                            <Folder className="mr-2 text-blue-500" />
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={projectData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter project name"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Project Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={projectData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your project"
                            rows="4"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label
                                htmlFor="status"
                                className="text-sm font-medium text-gray-300 mb-2 flex items-center"
                            >
                                <CheckCircle className="mr-2 text-green-500" />
                                Project Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={projectData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="In Progress">
                                    In Progress
                                </option>
                                <option value="Ongoing">
                                    Ongoing
                                </option>
                                <option value="Completed">
                                    Completed
                                </option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="team"
                                className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                            >
                                <Users className="mr-2 text-purple-500" />
                                Team Size
                            </label>
                            <input
                                type="number"
                                id="team"
                                name="team"
                                value={projectData.team}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                        <div>
                            <label
                                htmlFor="deadline"
                                className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                            >
                                <Calendar className="mr-2 text-yellow-500" />
                                Deadline
                            </label>
                            <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={projectData.deadline}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300"
                    >
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProjectPage;
