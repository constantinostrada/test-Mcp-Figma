import './style.css';
import { setupCounter } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup counter button
  const counterBtn = document.querySelector('#counter-btn');
  if (counterBtn) {
    setupCounter(counterBtn);
  }

  // Log greeting message
  greet('Figma-MCP-Test');
});
