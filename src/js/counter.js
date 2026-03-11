/* eslint-disable no-console */
// API base URL - adjust if needed
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetches the current counter value from the API
 * @returns {Promise<number>} The current counter value
 */
async function fetchCounterValue() {
  try {
    const response = await fetch(`${API_BASE_URL}/counter`);
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error fetching counter value:', error);
    return 0;
  }
}

/**
 * Increments the counter via API
 * @param {number} amount - Amount to increment
 * @returns {Promise<number>} The new counter value
 */
async function incrementCounter(amount = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/counter/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return null;
  }
}

/**
 * Decrements the counter via API
 * @param {number} amount - Amount to decrement
 * @returns {Promise<number>} The new counter value
 */
export async function decrementCounter(amount = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/counter/decrement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error decrementing counter:', error);
    return null;
  }
}

/**
 * Decrements the counter by ten via API
 * @returns {Promise<number>} The new counter value
 */
async function decrementByTen() {
  try {
    const response = await fetch(`${API_BASE_URL}/counter/decrement-ten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error decrementing counter by ten:', error);
    return null;
  }
}

/**
 * Updates the counter display
 * @param {HTMLElement} displayElement - The element to update
 * @param {number} value - The new value to display
 */
function updateCounterDisplay(displayElement, value) {
  if (displayElement) {
    displayElement.textContent = value.toString();
  }
}

/**
 * Sets up a counter button that increments on click
 * @param {HTMLElement} element - The button element to attach the counter to
 */
export function setupCounter(element) {
  const counterSpan = element.querySelector('#counter');

  // Initialize counter from API
  fetchCounterValue().then((value) => {
    updateCounterDisplay(counterSpan, value);
  });

  // Increment on click
  element.addEventListener('click', async () => {
    const newValue = await incrementCounter(1);
    if (newValue !== null) {
      updateCounterDisplay(counterSpan, newValue);
    }
  });
}

/**
 * Sets up a decrement-by-ten button
 * @param {HTMLElement} element - The button element to attach the handler to
 * @param {HTMLElement} displayElement - The element displaying the counter value
 */
export function setupDecrementByTen(element, displayElement) {
  element.addEventListener('click', async () => {
    const newValue = await decrementByTen();
    if (newValue !== null) {
      updateCounterDisplay(displayElement, newValue);
    }
  });
}
