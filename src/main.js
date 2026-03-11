import './style.css';
import { setupCounter, setupDecrementByTen } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup counter button
  const counterBtn = document.querySelector('#counter-btn');
  const counterDisplay = document.querySelector('#counter');

  if (counterBtn) {
    setupCounter(counterBtn);
  }

  // Setup decrement-by-ten button
  const decrementTenBtn = document.querySelector('#decrement-ten-btn');
  if (decrementTenBtn && counterDisplay) {
    setupDecrementByTen(decrementTenBtn, counterDisplay);
  }

  // Log greeting message
  greet('Figma-MCP-Test');
});
