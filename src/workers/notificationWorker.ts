import { Worker } from 'bullmq';
import { logNotificationHandler } from '../routes/notifications';
import { connection } from '../utils/redisConnection';

const notificationWorker = new Worker('notifications', async (job) => {
    const { recipientId, notificationType, content } = job.data;
    // Log the notification to a file
    logNotificationHandler(recipientId, notificationType, content);
}, { connection });


// in this case we don't do anything with the job, we just log it to a file
// but here we can notify the user, send an email, with the status of the job
notificationWorker.on('completed', (job) => {
    console.log('Notification written to file', job?.id);
});

notificationWorker.on('failed', (job, err) => {
    console.error('Notification does not written to file', job?.id, err);
});