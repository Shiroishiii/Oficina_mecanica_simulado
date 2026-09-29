import { Router } from 'express';

import {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from '../controllers/clientController.js';

import { authenticate } from '../middleware/auth.js';

const clientRouter = Router();

clientRouter.use(authenticate);

clientRouter.get('/', getAllClients);

clientRouter.get('/:id', getClientById);

clientRouter.post('/', createClient);

clientRouter.put('/:id', updateClient);

clientRouter.delete('/:id', deleteClient);

export default clientRouter
;