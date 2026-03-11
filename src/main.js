import './style.css';
import { setupCounter } from './js/counter.js';
import { greet } from './js/utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup counter controls
  const counterDisplay = document.querySelector('#counter');
  const incrementBtn = document.querySelector('#increment-btn');
  const decrementBtn = document.querySelector('#decrement-btn');
  const resetBtn = document.querySelector('#reset-btn');

  if (counterDisplay && incrementBtn && decrementBtn && resetBtn) {
    setupCounter(counterDisplay, incrementBtn, decrementBtn, resetBtn);
  }

  // Log greeting message
  greet('Figma-MCP-Test');
});
