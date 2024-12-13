import express from 'express';
import {
    createProject,
    getUserProjects,
    getProjectById,
    updateProject,
    deleteProject,
    deleteResources,
} from '../controllers/project.cont.js';

import ticketRouter from './ticket.route.js';
import { validateProjectAccess } from '../middlewares/access.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use('/:projectId/tickets', validateProjectAccess, ticketRouter);

router.post('/', upload.array('resources'), createProject);

router.get('/', getUserProjects);
router.get('/:projectId', validateProjectAccess, getProjectById);

router.patch('/:projectId', upload.array('resources'), validateProjectAccess, updateProject);

router.delete('/:projectId/resource', validateProjectAccess, deleteResources);
router.delete('/:projectId', validateProjectAccess, deleteProject);

export default router;