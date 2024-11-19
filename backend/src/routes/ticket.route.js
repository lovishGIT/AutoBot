import express from 'express';
import * as ticket from '../controllers/ticket.cont.js';

const ticketRouter = express.Router();

ticketRouter.route('/tickets').post(ticket.createTicket);
ticketRouter.route('/tickets/:id').delete(ticket.deleteTicket);
ticketRouter.route('/playground/:projectId/tickets').get(ticket.getAllTickets);
ticketRouter.route('/playground/:projectId/tickets/:id').get(ticket.getTicketById);

export default ticketRouter;