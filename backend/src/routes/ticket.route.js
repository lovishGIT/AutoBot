import express from 'express';
import {
    createTicket,
    getProjectTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    addComment,
    updateComment,
    deleteComment,
} from '../controllers/ticket.cont.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getProjectTickets);
router.get('/:ticketId', getTicketById);
router.patch('/:ticketId', updateTicket);
router.delete('/:ticketId', deleteTicket);

// Comment routes
router.post('/:ticketId/comments', addComment);
router.patch(
    '/:ticketId/comments/:commentId',
    updateComment
);
router.delete(
    '/:ticketId/comments/:commentId',
    deleteComment
);

export default router;
