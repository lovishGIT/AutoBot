import Project from "../models/project.model.js";
import Ticket from "../models/ticket.model.js";

export const validateProjectAccess = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res
                .status(404)
                .json({ message: 'Project not found' });
        }

        const isOwner =
            project.owner.toString() === req.user._id.toString();
        const isCollaborator = project.collaborators.includes(
            req.user._id
        );

        if (!isOwner && !isCollaborator) {
            return res
                .status(401)
                .json({ message: 'Not authorized for this project' });
        }

        req.project = project;
        next();
    } catch (error) {
        next(error);
    }
};


export const validateTicketAccess = async (req, res, next) => {
    try {
        if (!req.project) {
            return res
                .status(400)
                .json({ message: 'Project not found' });
        }
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res
                .status(404)
                .json({ message: 'Ticket not found' });
        }

        const project = req.project;

        if (!project) {
            return res
                .status(404)
                .json({ message: 'Associated project not found' });
        }

        const isOwner =
            project.owner.toString() === req.user._id.toString();
        const isCollaborator = ticket.collaborators.includes(
            req.user._id
        );

        if (!isOwner && !isCollaborator) {
            return res
                .status(401)
                .json({ message: 'Not authorized for this ticket' });
        }

        req.ticket = ticket;
        next();
    } catch (error) {
        next(error);
    }
};