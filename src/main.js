import './style.css';
import { setupCounter, setupIncrementByFour } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup counter button
  const counterBtn = document.querySelector('#counter-btn');
  if (counterBtn) {
    setupCounter(counterBtn);
  }

  // Setup increment-by-4 button
  const incrementByFourBtn = document.querySelector('#increment-by-4-btn');
  if (incrementByFourBtn) {
    setupIncrementByFour(incrementByFourBtn);
  }

  // Log greeting message
  greet('Figma-MCP-Test');
});
