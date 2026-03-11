import express from 'express';
import cors from 'cors';
import counterRoutes from './routes/counter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/counter', counterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Counter API Documentation',
    version: '1.0.0',
    baseUrl: `/api`,
    endpoints: [
      {
        path: '/counter',
        method: 'GET',
        description: 'Get the current counter value',
        responses: {
          200: {
            description: 'Success',
            example: { value: 0 },
          },
        },
      },
      {
        path: '/counter/increment',
        method: 'POST',
        description: 'Increment the counter by a specified amount',
        body: {
          amount: {
            type: 'number',
            required: false,
            default: 1,
            description: 'The amount to increment (must be positive)',
          },
        },
        responses: {
          200: {
            description: 'Success',
            example: { value: 1, previousValue: 0 },
          },
          400: {
            description: 'Bad Request',
            example: { error: 'Amount must be a positive number' },
          },
        },
      },
      {
        path: '/counter/decrement',
        method: 'POST',
        description: 'Decrement the counter by a specified amount',
        body: {
          amount: {
            type: 'number',
            required: false,
            default: 1,
            description: 'The amount to decrement (must be positive)',
          },
        },
        responses: {
          200: {
            description: 'Success',
            example: { value: -1, previousValue: 0 },
          },
          400: {
            description: 'Bad Request',
            example: { error: 'Amount must be a positive number' },
          },
        },
      },
      {
        path: '/counter/decrement-ten',
        method: 'POST',
        description: 'Decrement the counter by ten',
        responses: {
          200: {
            description: 'Success',
            example: {
              value: -10,
              previousValue: 0,
              change: -10,
              operation: 'decrement-by-ten',
            },
          },
        },
      },
      {
        path: '/counter/reset',
        method: 'POST',
        description: 'Reset the counter to zero or a specified value',
        body: {
          value: {
            type: 'number',
            required: false,
            default: 0,
            description: 'The value to reset the counter to',
          },
        },
        responses: {
          200: {
            description: 'Success',
            example: { value: 0, previousValue: 5 },
          },
          400: {
            description: 'Bad Request',
            example: { error: 'Value must be a number' },
          },
        },
      },
    ],
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      'GET /api/health',
      'GET /api/docs',
      'GET /api/counter',
      'POST /api/counter/increment',
      'POST /api/counter/decrement',
      'POST /api/counter/decrement-ten',
      'POST /api/counter/reset',
    ],
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\n🚀 Counter API Server running on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs\n`);
});

export default app;
