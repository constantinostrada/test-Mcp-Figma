// In-memory counter storage (in production, use a database)
let counter = 0;

/**
 * Get the current counter value
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getCounter = (req, res, next) => {
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
export const incrementCounter = (req, res, next) => {
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
  }
};

/**
 * Decrement the counter by a specified amount
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const decrementCounter = (req, res, next) => {
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
  }
};

/**
 * Decrement the counter by ten
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const decrementByTen = (req, res, next) => {
  try {
    const amount = 10;
    const previousValue = counter;

    counter -= amount;

    res.json({
      value: counter,
      previousValue,
      change: -amount,
      operation: 'decrement-by-ten',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset the counter to zero or a specified value
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const resetCounter = (req, res, next) => {
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
  }
};
