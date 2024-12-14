import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/Project/add/projectHeader';
import { ProjectBasicInfo } from '@/components/Project/add/projectBaseInfo';
import { ProjectLinkInput } from '@/components/Project/add/projectLinkInput';
import { ProjectResourcesSection } from '@/components/Project/add/projectResourceSection';
import { ProjectStatusSelector } from '@/components/Project/add/projectStatusSelector';
import { useProjects } from '@/hooks/useProject';

const AddProjectPage = () => {
    const navigate = useNavigate();
    const { createProject } = useProjects();

    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        link: '',
        resources: [],
        resourceTexts: [],
        isFile: [],
        status: 'active',
    });

    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    const addResourceField = () => {
        setProjectData((prev) => ({
            ...prev,
            resourceTexts: [...prev.resourceTexts, ''],
            resources: [...prev.resources, ''],
            isFile: [...prev.isFile, false],
        }));
    };

    const removeResourceField = (indexToRemove) => {
        setProjectData((prev) => ({
            ...prev,
            resourceTexts: prev.resourceTexts.filter(
                (_, index) => index !== indexToRemove
            ),
            resources: prev.resources.filter(
                (_, index) => index !== indexToRemove
            ),
            isFile: prev.isFile.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    const handleResourceChange = (
        index,
        value,
        type
    ) => {
        setProjectData((prev) => {
            const newState = { ...prev };
            const isFileAtIndex = prev.isFile[index];

            if (type === 'text' && !isFileAtIndex) {
                newState.resourceTexts[index] = value;
            } else if (type === 'file' && isFileAtIndex) {
                newState.resources[index] = value;
            }

            return newState;
        });
    };

    const handleResourceTypeToggle = (index) => {
        setProjectData((prev) => {
            const newIsFile = [...prev.isFile];
            const newResourceTexts = [...prev.resourceTexts];
            const newResources = [...prev.resources];

            // Toggle the isFile state
            newIsFile[index] = !newIsFile[index];

            if (newIsFile[index]) {
                // Switching from text to file
                newResourceTexts[index] = '';
                newResources[index] = '';
            } else {
                // Switching from file to text
                newResources[index] = '';
            }

            return {
                ...prev,
                isFile: newIsFile,
                resourceTexts: newResourceTexts,
                resources: newResources,
            };
        });
    };

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
            const formData = new FormData();

            // Add basic project details
            formData.append('name', projectData.name);
            formData.append('description', projectData.description);
            formData.append('status', projectData.status);

            // Add links
            const links = projectData.link;
            formData.append('link', links);

            // Add text resources
            let resourceTexts = '';
            projectData.resourceTexts.forEach((text, index) => {
                if (text && !projectData.isFile[index]) {
                    resourceTexts = resourceTexts + ', ' + text;
                }
            });

            formData.append('resourceTexts', resourceTexts);

            let resourceImages = new Array();
            projectData.resources.forEach((file, index) => {
                if (file && projectData.isFile[index]) {
                    resourceImages.push(file);
                }
            });

            resourceImages.forEach((file) => {
                formData.append('resources', file);
            });

            // const data = Object.fromEntries(formData.entries());
            // await createProject(data);

            await createProject(formData);
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
                <PageHeader onBackClick={handleBackButton} title={'Add Project'}/>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 rounded-lg p-8 shadow-lg"
                >
                    <ProjectBasicInfo
                        name={projectData.name}
                        description={projectData.description}
                        onInputChange={handleInputChange}
                    />

                    <ProjectLinkInput
                        link={projectData.link}
                        onInputChange={handleInputChange}
                    />

                    <ProjectResourcesSection
                        isOpen={isResourcesOpen}
                        onToggle={() =>
                            setIsResourcesOpen(!isResourcesOpen)
                        }
                        resources={projectData.resources}
                        resourceTexts={projectData.resourceTexts}
                        isFile={projectData.isFile}
                        onAddResource={addResourceField}
                        onRemoveResource={removeResourceField}
                        onResourceChange={handleResourceChange}
                        onResourceTypeToggle={
                            handleResourceTypeToggle
                        }
                    />

                    <ProjectStatusSelector
                        status={projectData.status}
                        onInputChange={handleInputChange}
                    />

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