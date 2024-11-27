import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Briefcase } from 'lucide-react';

const ProjectSidebar = () => {
    // Sample project data (similar to the main dashboard)
    const allProjects = [
        {
            id: 1,
            name: 'E-commerce Platform',
            type: 'Professional',
            status: 'In Progress',
            icon: Briefcase,
            iconColor: 'text-blue-500',
        },
        {
            id: 2,
            name: 'Mobile Banking App',
            type: 'Professional',
            status: 'Completed',
            icon: Briefcase,
            iconColor: 'text-blue-500',
        },
        {
            id: 3,
            name: 'Portfolio Website',
            type: 'Personal',
            status: 'In Progress',
            icon: Folder,
            iconColor: 'text-green-500',
        },
        {
            id: 4,
            name: 'Machine Learning Study',
            type: 'Personal',
            status: 'Ongoing',
            icon: Folder,
            iconColor: 'text-green-500',
        },
    ];

    return (
        <div className="w-64 bg-gray-800 text-white p-6 h-screen fixed left-0 top-0 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">My Projects</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Briefcase className="mr-2 text-blue-500" />
                    Professional Projects
                </h3>
                {allProjects
                    .filter(
                        (project) => project.type === 'Professional'
                    )
                    .map((project) => (
                        <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            className="block py-2 px-3 hover:bg-gray-700 rounded transition flex items-center"
                        >
                            <project.icon
                                className={`mr-2 ${project.iconColor} w-4 h-4`}
                            />
                            <span>{project.name}</span>
                            <span
                                className={`ml-auto text-xs px-2 py-1 rounded-full
                                    ${
                                        project.status === 'Completed'
                                            ? 'bg-green-600'
                                            : 'bg-blue-600'
                                    }`}
                            >
                                {project.status}
                            </span>
                        </Link>
                    ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Folder className="mr-2 text-green-500" />
                    Personal Projects
                </h3>
                {allProjects
                    .filter((project) => project.type === 'Personal')
                    .map((project) => (
                        <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            className="block py-2 px-3 hover:bg-gray-700 rounded transition flex items-center"
                        >
                            <project.icon
                                className={`mr-2 ${project.iconColor} w-4 h-4`}
                            />
                            <span>{project.name}</span>
                            <span
                                className={`ml-auto text-xs px-2 py-1 rounded-full
                                    ${
                                        project.status === 'Completed'
                                            ? 'bg-green-600'
                                            : 'bg-blue-600'
                                    }`}
                            >
                                {project.status}
                            </span>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;
