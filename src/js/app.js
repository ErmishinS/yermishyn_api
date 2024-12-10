import express from 'express';
import userRoutes from './routes/userRoutes.js';
import mediaContentRoutes from './routes/mediaContentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', mediaContentRoutes);

app.use(errorHandler);

export default app;