/**
 * Counter class to manage counter state and operations
 * Implements thread-safe operations and proper state management
 */
class Counter {
  constructor(initialValue = 0) {
    this._value = initialValue;
    this._observers = [];
    this._pendingOperations = 0;
    this._operationQueue = Promise.resolve();
  }

  /**
   * Get current counter value
   * @returns {number} Current counter value
   */
  getValue() {
    return this._value;
  }

  /**
   * Set counter value with validation
   * @param {number} value - New counter value
   * @throws {Error} If value is not a valid number
   */
  setValue(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error('Counter value must be a finite number');
    }
    this._value = Math.floor(value); // Ensure integer values
    this._notifyObservers();
  }

  /**
   * Increment counter by specified amount
   * Handles concurrent requests gracefully using operation queue
   * @param {number} amount - Amount to increment (default: 1)
   * @returns {Promise<number>} Promise that resolves to new counter value
   */
  async increment(amount = 1) {
    return this._queueOperation(() => {
      if (typeof amount !== 'number' || !Number.isFinite(amount)) {
        throw new Error('Increment amount must be a finite number');
      }
      this._value += Math.floor(amount);
      this._notifyObservers();
      return this._value;
    });
  }

  /**
   * Decrement counter by specified amount
   * Handles concurrent requests gracefully using operation queue
   * @param {number} amount - Amount to decrement (default: 1)
   * @returns {Promise<number>} Promise that resolves to new counter value
   */
  async decrement(amount = 1) {
    return this._queueOperation(() => {
      if (typeof amount !== 'number' || !Number.isFinite(amount)) {
        throw new Error('Decrement amount must be a finite number');
      }
      this._value -= Math.floor(amount);
      this._notifyObservers();
      return this._value;
    });
  }

  /**
   * Reset counter to initial value or specified value
   * @param {number} value - Value to reset to (default: 0)
   * @returns {Promise<number>} Promise that resolves to new counter value
   */
  async reset(value = 0) {
    return this._queueOperation(() => {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error('Reset value must be a finite number');
      }
      this._value = Math.floor(value);
      this._notifyObservers();
      return this._value;
    });
  }

  /**
   * Queue operation to handle concurrent requests gracefully
   * @private
   * @param {Function} operation - Operation to execute
   * @returns {Promise<any>} Promise that resolves to operation result
   */
  _queueOperation(operation) {
    this._operationQueue = this._operationQueue
      .then(() => {
        this._pendingOperations++;
        try {
          const result = operation();
          return result;
        } finally {
          this._pendingOperations--;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Counter operation failed:', error);
        throw error;
      });

    return this._operationQueue;
  }

  /**
   * Check if there are pending operations
   * @returns {boolean} True if operations are pending
   */
  hasPendingOperations() {
    return this._pendingOperations > 0;
  }

  /**
   * Subscribe to counter value changes
   * @param {Function} observer - Callback function to be called on value change
   * @returns {Function} Unsubscribe function
   */
  subscribe(observer) {
    if (typeof observer !== 'function') {
      throw new Error('Observer must be a function');
    }
    this._observers.push(observer);

    // Return unsubscribe function
    return () => {
      const index = this._observers.indexOf(observer);
      if (index > -1) {
        this._observers.splice(index, 1);
      }
    };
  }

  /**
   * Notify all observers of value change
   * @private
   */
  _notifyObservers() {
    this._observers.forEach((observer) => {
      try {
        observer(this._value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Observer notification failed:', error);
      }
    });
  }
}

/**
 * Sets up a counter with increment and decrement buttons
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.incrementButton - The increment button element
 * @param {HTMLElement} options.decrementButton - The decrement button element
 * @param {HTMLElement} options.display - The element to display counter value
 * @param {number} options.initialValue - Initial counter value (default: 0)
 * @returns {Object} Counter instance and cleanup function
 */
export function setupCounter({
  incrementButton,
  decrementButton,
  display,
  initialValue = 0,
}) {
  // Validate inputs
  if (!(incrementButton instanceof HTMLElement)) {
    throw new Error('incrementButton must be an HTMLElement');
  }
  if (!(decrementButton instanceof HTMLElement)) {
    throw new Error('decrementButton must be an HTMLElement');
  }
  if (!(display instanceof HTMLElement)) {
    throw new Error('display must be an HTMLElement');
  }

  // Create counter instance
  const counter = new Counter(initialValue);

  // Update display
  const updateDisplay = (value) => {
    display.textContent = value.toString();
  };

  // Subscribe to counter changes
  const unsubscribe = counter.subscribe(updateDisplay);

  // Set initial display value
  updateDisplay(counter.getValue());

  // Increment handler with debouncing to prevent rapid clicks
  const handleIncrement = async (event) => {
    event.preventDefault();
    try {
      incrementButton.disabled = true;
      await counter.increment(1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Increment failed:', error);
    } finally {
      incrementButton.disabled = false;
    }
  };

  // Decrement handler with debouncing to prevent rapid clicks
  const handleDecrement = async (event) => {
    event.preventDefault();
    try {
      decrementButton.disabled = true;
      await counter.decrement(1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Decrement failed:', error);
    } finally {
      decrementButton.disabled = false;
    }
  };

  // Attach event listeners
  incrementButton.addEventListener('click', handleIncrement);
  decrementButton.addEventListener('click', handleDecrement);

  // Return cleanup function and counter instance
  return {
    counter,
    cleanup: () => {
      incrementButton.removeEventListener('click', handleIncrement);
      decrementButton.removeEventListener('click', handleDecrement);
      unsubscribe();
    },
  };
}

/**
 * Export Counter class for testing and advanced usage
 */
export { Counter };
