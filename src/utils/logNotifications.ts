import fs from 'fs';

const logFilePath = 'notificationLog.txt';

// Function to log notifications to a file
// appendFileSync check if the file exists, if not it creates it
export function logNotification(recipientId: string, notificationTtype: string, content: string) {
    const newLog = `Recipient: ${recipientId}, Type: ${notificationTtype}, Content: ${content}\n`;
    fs.appendFileSync(logFilePath, newLog);
}