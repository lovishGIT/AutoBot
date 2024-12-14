import { useContext } from 'react';
import { ProjectContext } from '@/context/projects.context';

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error(
            'useProjects must be used within ProjectsProvider'
        );
    }
    return context;
};
