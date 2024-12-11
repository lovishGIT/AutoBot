import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/context/projects.context';
import {
    ArrowLeft,
    Folder,
    Link2,
    BookOpen,
    CheckCircle,
} from 'lucide-react';

const AddProjectPage = () => {
    const navigate = useNavigate();
    const { createProject } = useProject();

    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        link: '',
        resources: '',
        status: 'active',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            projectData.link = projectData.link.split(',');
            projectData.resources = projectData.resources.split(',');
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
                            className="text-sm font-medium text-gray-300 mb-2 flex items-center"
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
                            required
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

                    <div className="mb-4">
                        <label
                            htmlFor="link"
                            className="text-sm font-medium text-gray-300 mb-2 flex items-center"
                        >
                            <Link2 className="mr-2 text-green-500" />
                            Project Link
                        </label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={projectData.link}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter project link (comma seprated)"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="resources"
                            className="text-sm font-medium text-gray-300 mb-2 flex items-center"
                        >
                            <BookOpen className="mr-2 text-purple-500" />
                            Project Resources
                        </label>
                        <textarea
                            id="resources"
                            name="resources"
                            value={projectData.resources}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="List project resources (comma seprated)"
                            rows="3"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="status"
                            className="text-sm font-medium text-gray-300 mb-2 flex items-center"
                        >
                            <CheckCircle className="mr-2 text-yellow-500" />
                            Project Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={projectData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 capitalize"
                        >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                            <option value="completed">
                                Completed
                            </option>
                        </select>
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
