import { Worker } from 'bullmq';
import { logNotificationHandler } from '../routes/notifications';

const notificationWorker = new Worker('notifications', async () => {
    // TODO: Implement the logic to process the notification
});