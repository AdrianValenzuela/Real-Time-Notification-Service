import { Router } from 'express';

const notificationsRouter = Router();

// POST /notifications
notificationsRouter.post('/', (req, res) => {
    res.status(200).json({
        message: 'Notification received',
    });
});

export default notificationsRouter;