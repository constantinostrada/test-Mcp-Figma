// In-memory counter storage (in production, use a database)
let counter = 0;
let isLocked = false; // Simple mutex for demonstration

// Helper function to acquire a lock
const acquireLock = async () => {
  return new Promise(resolve => {
    const checkLock = () => {
      if (!isLocked) {
        isLocked = true;
        resolve();
      } else {
        setTimeout(checkLock, 10); // Retry after a short delay
      }
    };
    checkLock();
  });
};

// Helper function to release a lock
const releaseLock = () => {
  isLocked = false;
};

/**
 * Get the current counter value
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getCounter = async (req, res, next) => {
  try {
    res.json({
      value: counter,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Increment the counter by a specified amount
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const incrementCounter = async (req, res, next) => {
  await acquireLock();
  try {
    const amount = req.body.amount || 1;
    const previousValue = counter;

    counter += amount;

    res.json({
      value: counter,
      previousValue,
      change: amount,
      operation: 'increment',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  } finally {
    releaseLock();
  }
};

/**
 * Decrement the counter by a specified amount
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const decrementCounter = async (req, res, next) => {
  await acquireLock();
  try {
    const amount = req.body.amount || 1;
    const previousValue = counter;

    counter -= amount;

    res.json({
      value: counter,
      previousValue,
      change: -amount,
      operation: 'decrement',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  } finally {
    releaseLock();
  }
};

/**
 * Reset the counter to zero or a specified value
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const resetCounter = async (req, res, next) => {
  await acquireLock();
  try {
    const { value } = req.body;
    const previousValue = counter;

    // Validate that value is a number if provided
    if (value !== undefined) {
      if (typeof value !== 'number' || isNaN(value)) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Value must be a valid number',
          field: 'value',
          receivedValue: value,
          receivedType: typeof value,
        });
      }
      counter = value;
    } else {
      counter = 0;
    }

    res.json({
      value: counter,
      previousValue,
      operation: 'reset',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  } finally {
    releaseLock();
  }
};

/**
 * Increment the counter by 4
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const incrementByFour = async (req, res, next) => {
  await acquireLock();
  try {
    const previousValue = counter;
    const amount = 4;

    counter += amount;

    res.json({
      value: counter,
      previousValue,
      change: amount,
      operation: 'increment-by-4',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  } finally {
    releaseLock();
  }
};