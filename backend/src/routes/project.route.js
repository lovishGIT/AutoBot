import express from 'express';
import {
    createProject,
    getUserProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from '../controllers/project.cont.js';

import ticketRouter from './ticket.route.js';
import { validateProjectAccess } from '../middlewares/access.middleware.js';

const router = express.Router();

router.use('/:projectId/tickets', validateProjectAccess, ticketRouter);

router.post('/', createProject);
router.get('/', getUserProjects);
router.get('/:projectId', validateProjectAccess, getProjectById);
router.patch('/:projectId', validateProjectAccess, updateProject);
router.delete('/:projectId', validateProjectAccess, deleteProject);

export default router;