import Project from '../models/project.model.js';
import User from '../models/user.model.js';
import {
    deleteFromCloud,
    uploadToCloud,
} from '../utils/cloudinary.util.js';

export const createProject = async (req, res) => {
    try {
        const { name, description, link, status } = req.body;

        let resources = [];
        let collaborators = req.body.collaborators || '';

        if (req.files) {
            resources = req.files.map((file) => file.path);

            if (resources) {
                resources = await Promise.all(
                    resources.map(
                        async (resource) =>
                            await uploadToCloud(resource)
                    )
                );
            } else {
                resources = [];
            }
        }

        if (req.body.resourceTexts) {
            resources = [
                ...resources,
                ...req.body.resourceTexts.split(',').map((text) => {
                    return { text };
                }),
            ];
        }

        if (collaborators) {

            collaborators = collaborators.trim().split(',');
            collaborators = await Promise.all(
                collaborators.map(async (email) => {
                    const user = await User.findOne({ email });
                    if (user) {
                        return user._id;
                    }
                })
            );
        }

        resources = resources?.length > 0 ?
            resources.filter( (resource) =>
                resource != null && (resource?.url?.length > 0 || resource?.text?.length > 0))
            : [];

        const project = await Project.create({
            owner: req.user._id,
            name,
            description,
            link: link
                .split(',')
                .map((link) => link.trim())
                .filter((link) => link.length > 0),
            resources: resources,
            status,
            collaborators: collaborators.length > 0 ? collaborators : [],
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { projects: project._id },
        });

        return res.status(201).json(project);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getUserProjects = async (req, res) => {
    try {
        const userDocWithProjects = await User.findById(
            req.user._id
        ).populate('projects');

        if (!userDocWithProjects) {
            return res
                .status(404)
                .json({ message: 'User not found' });
        }

        return res.status(200).json(userDocWithProjects.projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = req.project;
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { description, link, status } = req.body;

        let resources = [];

        if (req.files) {
            resources = req.files.map((file) => {
                return file.path;
            });

            if (resources) {
                resources = await Promise.all(
                    resources.map(async (resource) => {
                        return await uploadToCloud(resource);
                    })
                );
            } else {
                resources = [];
            }
        }

        const project = req.project;

        project.description = description || project.description;
        project.link = link || project.link;
        project.resources = [...project.resources, ...resources];

        project.status = status || project.status;

        const updatedProject = await project.save();

        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteResources = async (req, res) => {
    try {
        const project = req.project;
        if (!project) {
            return res
                .status(404)
                .json({ message: 'Project not found' });
        }

        if (!req.body.resources) {
            return res.status(400).json({
                message: 'Resource not provided',
            });
        }
        const resources = req.body.resources;

        if (project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message:
                    'You are not authorized to delete this resource',
            });
        }

        const resourcesToDelete = project.resources.filter((res) =>
            resources.includes(res.url)
        );

        project.resources = project.resources.filter(
            (res) => !resources.includes(res.url)
        );

        await Promise.all(
            resourcesToDelete.map(async (resource) => {
                await deleteFromCloud(resource.public_id);
            })
        );

        await project.save();

        return res.status(200).json({
            message: 'Resource removed successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = req.project;

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { projects: project._id },
        });

        await project.deleteOne();

        return res.status(200).json({
            message: 'Project removed successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
