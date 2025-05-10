import { Queue } from 'bullmq';
import { connection } from '../utils/redisConnection';

export const notificationQueue = new Queue('notifications', { connection });