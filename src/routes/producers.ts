import { Router } from 'express';
import { ProducersController } from '../controllers/producers.controller.js';

const router = Router();
const controller = new ProducersController();

router.get('/intervalos', (req, res) => controller.getIntervals(req, res));

export default router;