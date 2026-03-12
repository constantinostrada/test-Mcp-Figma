const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetches the current counter value from the API
 * @returns {Promise<number>} The current counter value
 */
async function fetchCounterValue() {
  try {
    const response = await fetch(`${API_BASE_URL}/counter`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching counter value:', error);
    // Fallback to local counter if API is not available
    return null;
  }
}

/**
 * Increments the counter by a specified amount via the API
 * @param {number} amount - The amount to increment
 * @returns {Promise<number>} The new counter value
 */
async function incrementCounterAPI(amount) {
  try {
    const response = await fetch(`${API_BASE_URL}/counter/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error incrementing counter:', error);
    return null;
  }
}

/**
 * Updates the counter display
 * @param {number} value - The counter value to display
 */
function updateCounterDisplay(value) {
  const counterSpan = document.querySelector('#counter');
  if (counterSpan) {
    counterSpan.textContent = value.toString();
  }
}

/**
 * Sets up a counter button that increments on click
 * @param {HTMLElement} element - The button element to attach the counter to
 */
export function setupCounter(element) {
  let counter = 0;
  let useAPI = false;

  // Initialize counter value from API
  fetchCounterValue().then((value) => {
    if (value !== null) {
      counter = value;
      useAPI = true;
      updateCounterDisplay(counter);
    }
  });

  const setCounter = (count) => {
    counter = count;
    updateCounterDisplay(counter);
  };

  element.addEventListener('click', async () => {
    if (useAPI) {
      const newValue = await incrementCounterAPI(1);
      if (newValue !== null) {
        setCounter(newValue);
      } else {
        // Fallback to local increment if API fails
        setCounter(counter + 1);
      }
    } else {
      setCounter(counter + 1);
    }
  });
}

/**
 * Sets up the increment-by-10000 button
 * @param {HTMLElement} element - The button element
 */
export function setupIncrementBy10k(element) {
  let counter = 0;
  let useAPI = false;

  // Initialize counter value from API
  fetchCounterValue().then((value) => {
    if (value !== null) {
      counter = value;
      useAPI = true;
      updateCounterDisplay(counter);
    }
  });

  const setCounter = (count) => {
    counter = count;
    updateCounterDisplay(counter);
  };

  element.addEventListener('click', async () => {
    if (useAPI) {
      const newValue = await incrementCounterAPI(10000);
      if (newValue !== null) {
        setCounter(newValue);
      } else {
        // Fallback to local increment if API fails
        setCounter(counter + 10000);
      }
    } else {
      setCounter(counter + 10000);
    }
  });
}
