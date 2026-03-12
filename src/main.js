import './style.css';
import { setupCounter, setupIncrementBy10k } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup counter button
  const counterBtn = document.querySelector('#counter-btn');
  if (counterBtn) {
    setupCounter(counterBtn);
  }

  // Setup increment-by-10k button
  const counter10kBtn = document.querySelector('#counter-10k-btn');
  if (counter10kBtn) {
    setupIncrementBy10k(counter10kBtn);
  }

  // Log greeting message
  greet('Figma-MCP-Test');
});
