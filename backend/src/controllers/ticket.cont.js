import Ticket from '../models/ticket.model.js';

export const createTicket = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } =
            req.body;

        const ticket = await Ticket.create({
            title,
            description,
            priority,
            status,
            dueDate,
            projectId: req.project._id,
            createdBy: req.user._id,
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({
            projectId: req.project._id,
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTicketById = async (req, res) => {
    try {
        res.json(req.ticket); // Middleware attaches the ticket
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } =
            req.body;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.ticket._id,
            { title, description, priority, status, dueDate },
            { new: true }
        );

        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        await req.ticket.remove();
        res.json({ message: 'Ticket removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        const ticket = req.ticket;

        if (!ticket) {
            return res
                .status(404)
                .json({ message: 'Ticket not found' });
        }

        const comment = {
            text,
            author: req.user._id,
        };

        ticket.comments.push(comment);
        await ticket.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { text } = req.body;

        const ticket = await Ticket.findById(req.params.ticketId);

        if (!ticket) {
            return res
                .status(404)
                .json({ message: 'Ticket not found' });
        }

        const comment = ticket.comments.id(req.params.commentId);

        if (!comment) {
            return res
                .status(404)
                .json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({
                    message: 'Not authorized to update this comment',
                });
        }

        comment.text = text;
        await ticket.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketId);

        if (!ticket) {
            return res
                .status(404)
                .json({ message: 'Ticket not found' });
        }

        const comment = ticket.comments.id(req.params.commentId);

        if (!comment) {
            return res
                .status(404)
                .json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({
                    message: 'Not authorized to delete this comment',
                });
        }

        comment.remove();
        await ticket.save();

        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
