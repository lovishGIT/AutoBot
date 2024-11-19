import Developer from '../models/developer.model.js';
import Ticket from '../models/ticket.model.js';

export const addDeveloper = async (req, res) => {
    try {
        const developer = new Developer(req.body);
        await developer.save();
        res.status(201).json({
            message: 'Developer added successfully',
            developer,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Assign a ticket to a developer
export const assignTicketToDeveloper = async (req, res) => {
    try {
        const { developerId, ticketId } = req.body;
        const developer = await Developer.findById(developerId);
        const ticket = await Ticket.findById(ticketId);

        if (!developer || !ticket) {
            return res
                .status(404)
                .json({ message: 'Developer or Ticket not found' });
        }

        ticket.assignedDeveloper = developer._id;
        developer.ticketsAssigned.push(ticket._id);

        await ticket.save();
        await developer.save();

        res.status(200).json({
            message: 'Ticket assigned successfully',
            developer,
            ticket,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// List all developers
export const getAllDevelopers = async (req, res) => {
    try {
        const developers = await Developer.find().populate(
            'ticketsAssigned projects'
        );
        res.status(200).json(developers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
