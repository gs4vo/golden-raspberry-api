import express from 'express';
import { AwardInterval } from '../services/award.js';

const router = express.Router();


router.get('/intervalos', async (req, res) => {
    const result = await AwardInterval();
    res.json(result);
})

export default router;