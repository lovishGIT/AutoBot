import Ticket from '../models/ticket.model.js';
import Project from '../models/project.model.js';

// Async handler utility
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Create a new ticket
// @route   POST /api/tickets
export const createTicket = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        collaborators,
        status,
        priority,
        progress,
        projectId,
        dueDate,
    } = req.body;

    // Verify project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    // Ensure only project owner or collaborators can create tickets
    if (
        project.owner.toString() !== req.user._id.toString() &&
        !project.collaborators?.includes(req.user._id)
    ) {
        res.status(401);
        throw new Error(
            'Not authorized to create ticket in this project'
        );
    }

    const ticket = await Ticket.create({
        title,
        description,
        collaborators: collaborators || [req.user._id],
        status: status || 'open',
        priority: priority || 'medium',
        progress: progress || 0,
        projectId,
        dueDate,
    });

    res.status(201).json(ticket);
});

// @route   GET /api/tickets/project/:projectId
export const getProjectTickets = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
        res.status(404);
        throw new Error('Project not found');
    }

    if (project.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error(
            'Not authorized to view tickets for this project'
        );
    }

    const tickets = await Ticket.find({
        projectId: req.params.projectId,
    });

    res.status(200).json(tickets);
});

// @route   GET /api/tickets/:id
export const getTicketById = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const project = await Project.findById(ticket.projectId);
    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (
        project.owner.toString() !== req.user._id.toString() &&
        !ticket.collaborators.includes(req.user._id)
    ) {
        res.status(401);
        throw new Error('Not authorized to view this ticket');
    }

    res.status(200).json(ticket);
});

// @route   PATCH /api/tickets/:id
export const updateTicket = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        collaborators,
        status,
        priority,
        progress,
        dueDate,
    } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const project = await Project.findById(ticket.projectId);
    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (
        project.owner.toString() !== req.user._id.toString() &&
        !ticket.collaborators.includes(req.user._id)
    ) {
        res.status(401);
        throw new Error('Not authorized to update this ticket');
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.collaborators = collaborators || ticket.collaborators;
    ticket.status = status || ticket.status;
    ticket.priority = priority || ticket.priority;
    ticket.progress =
        progress !== undefined ? progress : ticket.progress;
    ticket.dueDate = dueDate || ticket.dueDate;

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
});

// @route   DELETE /api/tickets/:id
export const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const project = await Project.findById(ticket.projectId);
    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (project.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this ticket');
    }

    await ticket.deleteOne();

    res.status(200).json({ message: 'Ticket removed successfully' });
});

// @route   POST /api/tickets/:id/comments
export const addComment = asyncHandler(async (req, res) => {
    const { text, tag } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const project = await Project.findById(ticket.projectId);
    if (!project) {
        res.status(404);
        throw new Error('Associated project not found');
    }

    if (
        project.owner.toString() !== req.user._id.toString() &&
        !ticket.collaborators.includes(req.user._id)
    ) {
        res.status(401);
        throw new Error('Not authorized to comment on this ticket');
    }

    const commentAuthorTag =
        project.owner.toString() === req.user._id.toString()
            ? 'admin'
            : ticket.collaborators.includes(req.user._id)
            ? 'collaborator'
            : null;

    ticket.comments.push({
        text,
        author: req.user.fullName,
        tag: tag || commentAuthorTag,
    });

    await ticket.save();

    res.status(201).json(ticket);
});

// @route   PATCH /api/tickets/:ticketId/comments/:commentId
export const updateComment = asyncHandler(async (req, res) => {
    const { text, tag } = req.body;

    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const comment = ticket.comments.id(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    if (comment.author !== req.user.fullName) {
        res.status(401);
        throw new Error('Not authorized to update this comment');
    }

    comment.text = text || comment.text;
    comment.tag = tag || comment.tag;

    await ticket.save();

    res.status(200).json(ticket);
});

// @route   DELETE /api/tickets/:ticketId/comments/:commentId
export const deleteComment = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const comment = ticket.comments.id(req.params.commentId);

    if (!comment) {
        res.status(404);
        throw new Error('Comment not found');
    }

    const project = await Project.findById(ticket.projectId);
    const isProjectOwner =
        project.owner.toString() === req.user._id.toString();
    const isCommentAuthor = comment.author === req.user.fullName;

    if (!isProjectOwner && !isCommentAuthor) {
        res.status(401);
        throw new Error('Not authorized to delete this comment');
    }

    comment.remove();

    await ticket.save();

    res.status(200).json(ticket);
});
