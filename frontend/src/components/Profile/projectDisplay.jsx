import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProject';

export default function ProjectDisplay() {
    const { user } = useAuth();
    const { projects } = useProjects();
    return (
        <>
            {projects && projects.length > 0 && (
                <div className="p-6 bg-blue-900/50">
                    <h3 className="text-xl font-bold text-blue-300 mb-4">
                        My Projects
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {projects
                            .filter(
                                (proj) => proj.owner === user?._id
                            )
                            .map((project) => (
                                <Link
                                    to={`/projects/${project._id}`}
                                    key={project._id}
                                    className="bg-blue-950 p-4 rounded-lg border border-blue-800 hover:border-blue-600 transition-all duration-300"
                                >
                                    <h4 className="font-medium text-blue-200 mb-2">
                                        {project.name}
                                    </h4>
                                    <p className="text-blue-300 text-sm">
                                        {project.description}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </div>
            )}

            {(!projects || projects.length === 0) && (
                <div className="text-center p-6 text-blue-300 flex flex-col">
                    No Projects Found. Start creating!
                </div>
            )}
        </>
    );
}
