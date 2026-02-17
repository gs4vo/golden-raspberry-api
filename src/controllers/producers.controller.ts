import { Request, Response } from 'express';
import { AwardInterval } from '../services/award.js';

export class ProducersController {
    async getIntervals(req: Request, res: Response) {
        try {
            const result = await AwardInterval();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}