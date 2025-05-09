import fs from 'fs';
import path from 'path';

// Function to log notifications to a file
// appendFileSync check if the file exists, if not it creates it
export function logNotification(recipientId: string, notificationType: string, content: string) {
    if (recipientId === "" || notificationType === "" || content === "") {
        throw new Error('Invalid parameters: recipientId, notificationType and content are required.');
    }

    const logFilePath = path.resolve(__dirname, '../../notificationLog.txt');

    const newLog = `Recipient: ${recipientId}, Type: ${notificationType}, Content: ${content}\n`;
    fs.appendFileSync(logFilePath, newLog);
}