import fs from 'fs';
import path from 'path';

// Function to log notifications to a file
// appendFileSync check if the file exists, if not it creates it
export function logNotification(recipientId: string, notificationTtype: string, content: string) {
    const logFilePath = path.resolve(__dirname, '../../notificationLog.txt');

    const newLog = `Recipient: ${recipientId}, Type: ${notificationTtype}, Content: ${content}\n`;
    fs.appendFileSync(logFilePath, newLog);
}