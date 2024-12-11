import express from 'express';
import {
    createTicket,
    getProjectTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    // addComment,
    // updateComment,
    // deleteComment,
} from '../controllers/ticket.cont.js';
import { validateTicketAccess } from '../middlewares/access.middleware.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getProjectTickets);
router.get('/:ticketId', validateTicketAccess, getTicketById);
router.patch('/:ticketId', validateTicketAccess, updateTicket);
router.delete('/:ticketId', validateTicketAccess, deleteTicket);

// Comment routes // inactive routes [donot use]
// router.post('/:ticketId/comments', addComment);
// router.patch(
//     '/:ticketId/comments/:commentId',
//     updateComment
// );
// router.delete(
//     '/:ticketId/comments/:commentId',
//     deleteComment
// );

export default router;
