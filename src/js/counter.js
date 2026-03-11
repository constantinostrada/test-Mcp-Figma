/**
 * Sets up a counter with increment, decrement, and reset functionality
 * @param {HTMLElement} counterDisplay - The element to display the counter value
 * @param {HTMLElement} incrementBtn - The increment button element
 * @param {HTMLElement} decrementBtn - The decrement button element
 * @param {HTMLElement} resetBtn - The reset button element
 */
export function setupCounter(
  counterDisplay,
  incrementBtn,
  decrementBtn,
  resetBtn
) {
  let counter = 0;

  const setCounter = (count) => {
    counter = count;
    if (counterDisplay) {
      counterDisplay.textContent = counter.toString();
    }
  };

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  // Attach event listeners
  if (incrementBtn) {
    incrementBtn.addEventListener('click', increment);
  }

  if (decrementBtn) {
    decrementBtn.addEventListener('click', decrement);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', reset);
  }

  // Initialize counter to 0
  setCounter(0);
}

/**
 * Gets the current counter value
 * @returns {number} The current counter value
 */
export function getCounterValue() {
  const counterDisplay = document.querySelector('#counter');
  if (counterDisplay) {
    return parseInt(counterDisplay.textContent, 10) || 0;
  }
  return 0;
}
