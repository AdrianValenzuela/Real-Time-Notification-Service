import fs from 'fs';
import path from 'path';
import { logNotification } from '../../src/utils/logNotifications';

describe('logNotification', () => {
    const logFilePath = path.resolve(__dirname, '../../notificationLog.txt');

    beforeEach(() => {
        if (fs.existsSync(logFilePath)) {
            fs.unlinkSync(logFilePath); // clean up the log file before each test
        }
    });

    it('should log a notification to a file', () => {
        const recipientId = 'user123';
        const notificationType = 'message';
        const content = 'You have a new message!';

        logNotification(recipientId, notificationType, content);

        // Check if the log file exists and contains the correct log entry
        expect(fs.existsSync(logFilePath)).toBe(true);
        const logContent = fs.readFileSync(logFilePath, 'utf-8');
        expect(logContent).toContain(`Recipient: ${recipientId}, Type: ${notificationType}, Content: ${content}`);
    });
});