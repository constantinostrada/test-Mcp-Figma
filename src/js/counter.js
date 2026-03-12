const API_BASE_URL = 'http://localhost:3000/api/counter';

/**
 * Updates the counter display with the current value
 * @param {number} value - The counter value to display
 */
const updateCounterDisplay = (value) => {
  const counterSpan = document.querySelector('#counter');
  if (counterSpan) {
    counterSpan.textContent = value.toString();
  }
};

/**
 * Fetches the current counter value from the API
 * @returns {Promise<number>} The current counter value
 */
const fetchCounterValue = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch counter value');
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching counter value:', error);
    return 0;
  }
};

/**
 * Sets up a counter button that increments on click
 * @param {HTMLElement} element - The button element to attach the counter to
 */
export function setupCounter(element) {
  // Initialize counter from API
  fetchCounterValue().then(updateCounterDisplay);

  element.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to increment counter');
      }

      const data = await response.json();
      updateCounterDisplay(data.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error incrementing counter:', error);
      // Fallback to local increment
      const currentValue = parseInt(
        document.querySelector('#counter')?.textContent || '0',
        10
      );
      updateCounterDisplay(currentValue + 1);
    }
  });
}

/**
 * Sets up an increment-by-4 button that increments the counter by 4 on click
 * @param {HTMLElement} element - The button element to attach the increment-by-4 handler to
 */
export function setupIncrementByFour(element) {
  element.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/increment-by-4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to increment counter by 4');
      }

      const data = await response.json();
      updateCounterDisplay(data.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error incrementing counter by 4:', error);
      // Fallback to local increment
      const currentValue = parseInt(
        document.querySelector('#counter')?.textContent || '0',
        10
      );
      updateCounterDisplay(currentValue + 4);
    }
  });
}

/**
 * Sets up a reset button that resets the counter to zero on click
 * @param {HTMLElement} element - The button element to attach the reset handler to
 */
export function setupResetCounter(element) {
  element.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: 0 }), // Explicitly reset to 0
      });

      if (!response.ok) {
        throw new Error('Failed to reset counter');
      }

      const data = await response.json();
      updateCounterDisplay(data.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error resetting counter:', error);
      // Fallback to local reset
      updateCounterDisplay(0);
    }
  });
}
