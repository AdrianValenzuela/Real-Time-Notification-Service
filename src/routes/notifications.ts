import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { logNotification } from '../utils/logNotifications';
import { notificationQueue } from '../queues/notificationQueue';

const notificationsRouter = Router();

// Define the schema for the notification payload
const NotificationSchema = z.object({
    "recipientId": z.string(),
    "notificationType": z.string(),
    "content": z.string(),
});

export const logNotificationHandler = async (recipientId: string, notificationType: string, conent: string) => {
    // Log the notification to a file
    logNotification(recipientId, notificationType, conent);
}


// POST /notifications
notificationsRouter.post('/', async (req: Request, res: Response) => {
    // Validate the request body with the schema
    const valid = NotificationSchema.safeParse(req.body);
    if (!valid.success) {
        res.status(400).json({ error: 'Bad Request' });
    } else {
        const { recipientId, notificationType, content } = valid.data;
        // send the notification to the queue
        await notificationQueue.add('notification', {
            recipientId,
            notificationType,
            content
        });
        res.status(202).json({ message: 'Accepted' })
    }
});

export default notificationsRouter;