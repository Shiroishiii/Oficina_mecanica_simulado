import { Router } from 'express'

import {
    getAllVeiculos,
    getVeiculoById,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo
} from '../controllers/veiculoController.js';

import { authenticate } from "../middlewares/auth";

const veiculoRouter = Router();

veiculoRouter.use(authenticate);

veiculoRouter.get('/', getAllVeiculos);

veiculoRouter.get('/:id', getVeiculoById);

veiculoRouter.post('/', createVeiculo);

veiculoRouter.put('/:id', updateVeiculo);

veiculoRouter.delete('/:id', deleteVeiculo);

export default veiculoRouter;