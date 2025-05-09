import request from 'supertest';
import app from '../../src/app';
import { notificationQueue } from '../../src/queues/notificationQueue';

type MockNotification = {
    data: {
        recipientId: string;
        notificationType: string;
        content: string;
    }
};

jest.mock('../../src/queues/notificationQueue', () => ({
    notificationQueue: {
        getJobs: jest.fn().mockResolvedValue([
            {
                data: {
                    recipientId: 'user123',
                    notificationType: 'message',
                    content: 'You have a new message!',
                },
            },
        ]),
        add: jest.fn(),
    },
}));

describe('POST /notifications', () => {
    it('should enqueue a valid notification', async () => {
        const response = await request(app)
            .post('/notifications')
            .send({
                recipientId: 'user123',
                notificationType: 'message',
                content: 'You have a new message!',
            });

        // check if the job was added to the queue
        const queue: MockNotification[] = await notificationQueue.getJobs(['waiting', 'active', 'delayed']);
        expect(queue).toHaveLength(1);
        expect(queue.some((q: MockNotification) => q.data.recipientId === 'user123')).toBe(true);

        // check HTTP response
        expect(response.status).toBe(202);
        expect(response.body).toEqual({ message: 'Accepted' });

        // check if the job was added to the queue with the correct data
        expect(notificationQueue.add).toHaveBeenCalledWith('notification', {
            recipientId: 'user123',
            notificationType: 'message',
            content: 'You have a new message!',
        });
    });

    it('should return 400 for invalid body', async () => {
        const response = await request(app)
            .post('/notifications')
            .send({
                recipientId: 123,
                notificationType: 'message',
                content: 'You have a new message!',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Bad Request' });
    });
});
