import request from 'supertest';
import app from '../../src/app';

jest.mock('bullmq', () => {
    const originalModule = jest.requireActual('bullmq');
    return {
        ...originalModule,
        Queue: jest.fn().mockImplementation(() => ({
            add: jest.fn().mockResolvedValue(undefined),
        })),
    };
});

describe('POST /notifications', () => {
    it('should enqueue a valid notification', async () => {
        const response = await request(app)
            .post('/notifications')
            .send({
                recipientId: 'user123',
                notificationTtype: 'message',
                content: 'You have a new message!',
            });

        expect(response.status).toBe(202);
        expect(response.body).toEqual({ message: 'Accepted' });
    });

    it('should return 400 for invalid body', async () => {
        const response = await request(app)
            .post('/notifications')
            .send({
                recipientId: 123,
                notificationTtype: 'message',
                content: 'You have a new message!',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Bad Request' });
    });
});