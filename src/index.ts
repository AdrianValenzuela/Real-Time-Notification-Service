import express from 'express';
import dotenv from 'dotenv';
import notificationsRouter from './routes/notifications';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use('/notifications', notificationsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});