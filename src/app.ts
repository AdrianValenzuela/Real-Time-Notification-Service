import express from 'express';
import dotenv from 'dotenv';
import notificationsRouter from './routes/notifications';
import './workers/notificationWorker';

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use('/notifications', notificationsRouter);

export default app;