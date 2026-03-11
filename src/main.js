import './style.css';
import { setupCounter } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Get counter elements
  const incrementBtn = document.querySelector('#increment-btn');
  const decrementBtn = document.querySelector('#decrement-btn');
  const display = document.querySelector('#counter-display');

  // Setup counter if all elements are present
  if (incrementBtn && decrementBtn && display) {
    try {
      const { cleanup } = setupCounter({
        incrementButton: incrementBtn,
        decrementButton: decrementBtn,
        display: display,
        initialValue: 0,
      });

      // Log counter initialization
      // eslint-disable-next-line no-console
      console.log('✅ Counter initialized successfully');

      // Cleanup on page unload
      window.addEventListener('beforeunload', cleanup);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Failed to initialize counter:', error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Counter elements not found');
  }

  // Log greeting message
  greet('Counter App');
});
