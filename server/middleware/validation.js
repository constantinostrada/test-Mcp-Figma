/**
 * Validates counter increment/decrement requests
 * Ensures the amount parameter is a positive number
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const validateCounterRequest = (req, res, next) => {
  const { amount } = req.body;

  // If amount is not provided, use default value (handled in controller)
  if (amount === undefined) {
    return next();
  }

  // Validate that amount is a number
  if (typeof amount !== 'number' || isNaN(amount)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Amount must be a valid number',
      field: 'amount',
      receivedValue: amount,
      receivedType: typeof amount,
    });
  }

  // Validate that amount is positive
  if (amount <= 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Amount must be a positive number',
      field: 'amount',
      receivedValue: amount,
    });
  }

  // Validate that amount is finite
  if (!isFinite(amount)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Amount must be a finite number',
      field: 'amount',
      receivedValue: amount,
    });
  }

  next();
};
