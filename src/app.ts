import express from 'express';
import producersRouter from './routes/producers.js';

const app = express();

app.use(express.json());
app.use('/producers', producersRouter);

export default app;