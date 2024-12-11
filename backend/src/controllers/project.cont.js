import Project from '../models/project.model.js';
import User from '../models/user.model.js';

export const createProject = async (req, res) => {
    try {
        const { name, description, link, resources, status } =
            req.body;

        const project = await Project.create({
            owner: req.user._id,
            name,
            description,
            link,
            resources,
            status,
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { projects: project._id },
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        res.status(200).json(userDocWithProjects.projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = req.project;
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { description, link, resources, status, activities } =
            req.body;

        const project = req.project;

        project.description = description || project.description;
        project.link = link || project.link;
        project.resources = resources || project.resources;
        project.status = status || project.status;
        project.activities = activities || project.activities;

        const updatedProject = await project.save();

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = req.project;

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { projects: project._id },
        });

        await project.deleteOne();

        res.status(200).json({
            message: 'Project removed successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
