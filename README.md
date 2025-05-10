# Real-Time Notification Service (Backend Only)

This is a backend-only Node.js service for managing real-time notifications. It uses a queue-based system (BullMQ + Redis) to handle asynchronous processing of notifications, logging them to a file to simulate delivery.

## Features

- Built with **Node.js** and **TypeScript**
- **Express** API with a `/notifications` POST endpoint
- **Zod** for input validation
- **BullMQ** + **Redis** for background job processing
- Simulated delivery by writing logs to a file (`notificationLog.txt`)
- Unit and integration tests using **Jest** and **Supertest**
- PM2 optional usage to keep the worker process alive

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [BullMQ](https://docs.bullmq.io/)
- [Redis](https://redis.io/)
- [Zod](https://zod.dev/) (schema validation)
- [Jest](https://jestjs.io/) (unit testing)
- [Supertest](https://github.com/visionmedia/supertest) (integration testing)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notification-service.git
   cd notification-service

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file at the root:
  PORT=5000
  REDIS_HOST=localhost
  REDIS_PORT=6379

4. Ensure you have a Redis server running (locally or via Docker).

5. Start the server:
   ```bash
   npm start

## 📬 API Endpoint
**POST /notifications**

Queues a notification to be processed.

**Request Body:**
```json
{
  "recipientId": "user123",
  "notificationType": "message",
  "content": "You have a new message!"
}
```

**Responses:**
- **202 Accepted:** if successfully enqueued.
- **400 Bad Request:** if the payload is invalid.

## ⚙️ Project Structure
```bash
src/
├── app.ts                  # Express configuration
├── index.ts                # Entry point
├── routes/
│   └── notifications.ts    # /notifications route
├── queues/
│   └── notificationQueue.ts
├── workers/
│   └── notificationWorker.ts
├── utils/
│   └── logNotifications.ts
└── tests/
    ├── integration/
    │   └── notifications.test.ts
    └── unit/
        └── logNotifications.test.ts
```

## 🧪 Testing
Run all tests.
```bash
npm test
```

## ✅ Features
- Payload validation with Zod
- Notification queuing using BullMQ
- Simulated notification processing via file logs
- Unit and integration tests
- Fully typed with TypeScript

## 📂 Notification Logs
Processed notifications are logged to the notificationLog.txt file in the root directory.
