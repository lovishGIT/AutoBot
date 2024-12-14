import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProject';

const iconMap = {
    folder: Folder,
    briefcase: Briefcase,
    // Add more mappings as needed
};

const SingleProjectLink = ({ project, Icon }) => {
    if (!Icon) {
        Icon = Folder;
    }

    return (
        <Link
            to={`/projects/${project._id}`}
            className="py-2 px-3 hover:bg-gray-700 rounded transition flex items-center"
        >
            <Icon className="mr-2 w-4 h-4" />
            <span>{project.name}</span>
            <span
                className={`ml-auto text-xs px-2 py-1 rounded-full
                ${
                    project.status === 'completed'
                        ? 'bg-green-600'
                        : 'bg-blue-600'
                }`}
            >
                {project.status}
            </span>
        </Link>
    );
};



const ProjectSidebar = () => {
    const { user } = useAuth();
    const { projects } = useProjects();

    return (
        <div className="w-64 bg-gray-800 text-white p-6 h-screen fixed left-0 top-0 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">My Projects</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Briefcase className="mr-2 text-blue-500" />
                    Professional Projects
                </h3>
                {projects
                    .filter((project) => project.owner !== user._id)
                    .map((project) => (
                        <SingleProjectLink
                            key={project._id}
                            project={project}
                            icon={Briefcase}
                        />
                    ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Folder className="mr-2 text-green-500" />
                    Your Projects
                </h3>
                {projects
                    .filter((project) => project.owner === user._id)
                    .map((project) => (
                        <SingleProjectLink
                            key={project._id}
                            project={project}
                            icon={Folder}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;
