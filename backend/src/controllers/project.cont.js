import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// @route   POST /api/projects
export const createProject = async (req, res) => {
    try {
        const { name, description, link, resources, status } = req.body;

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

// @route   GET /api/projects
export const getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id });

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        if (project.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to access this project' });
            return;
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PATCH /api/projects/:id
export const updateProject = async (req, res) => {
    try {
        const { description, link, resources, status, activities } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to update this project' });
            return;
        }

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

// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to delete this project' });
            return;
        }

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
