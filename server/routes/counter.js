import express from 'express';
import {
  getCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
} from '../controllers/counterController.js';
import { validateCounterRequest } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route GET /api/counter
 * @description Get the current counter value
 * @access Public
 */
router.get('/', getCounter);

/**
 * @route POST /api/counter/increment
 * @description Increment the counter by a specified amount
 * @access Public
 * @body {amount?: number} - Amount to increment (default: 1)
 */
router.post('/increment', validateCounterRequest, incrementCounter);

/**
 * @route POST /api/counter/decrement
 * @description Decrement the counter by a specified amount
 * @access Public
 * @body {amount?: number} - Amount to decrement (default: 1)
 */
router.post('/decrement', validateCounterRequest, decrementCounter);

/**
 * @route POST /api/counter/reset
 * @description Reset the counter to zero or a specified value
 * @access Public
 * @body {value?: number} - Value to reset to (default: 0)
 */
router.post('/reset', resetCounter);

export default router;
