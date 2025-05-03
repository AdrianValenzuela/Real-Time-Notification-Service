import { Router } from 'express';
import { z } from 'zod';

const notificationsRouter = Router();

// Define the schema for the notification payload
const NotificationSchema = z.object({
    "recipientId": z.string(),
    "notificationTtype": z.string(),
    "content": z.string(),
});


// POST /notifications
notificationsRouter.post('/', (req, res) => {
    // Validate the request body with the schema
    const valid = NotificationSchema.safeParse(req.body);
    if (!valid.success) {
        res.status(400).json({});
    } else {
        res.status(200).json({ message: 'Notification received' })
    }
});

export default notificationsRouter;