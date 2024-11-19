import express from 'express';
import * as dev from '../controllers/developer.cont.js';

const devRouter = express.Router();

devRouter.post('/developers', dev.addDeveloper);
devRouter.post('/developers/assign-ticket', dev.assignTicketToDeveloper);
devRouter.get('/developers', dev.getAllDevelopers);

export default devRouter;
