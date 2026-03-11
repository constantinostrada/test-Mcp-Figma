# Counter App Documentation

## Overview
The Counter App provides a simple interface for incrementing, decrementing, and resetting a numerical counter.

## Features

### 1. Increment
- **Button**: Yellow button labeled "Increment"
- **Action**: Increases the counter value by 1
- **Styling**: Yellow background (#FFDB10) with dark text

### 2. Decrement
- **Button**: Red button labeled "Decrement"
- **Action**: Decreases the counter value by 1
- **Styling**: Red background (#FF0000) with white text
- **Note**: Counter can go below zero (negative values allowed)

### 3. Reset (NEW)
- **Button**: Blue button labeled "Reset"
- **Action**: Sets the counter value to 0
- **Styling**: Primary blue background (#646cff) with white text
- **Use Case**: Quickly return counter to initial state from any value (positive or negative)

## API Reference

### `setupCounter(counterDisplay, incrementBtn, decrementBtn, resetBtn)`
Sets up a counter with full functionality.

**Parameters:**
- `counterDisplay` (HTMLElement): Element to display the counter value
- `incrementBtn` (HTMLElement): Button element for increment action
- `decrementBtn` (HTMLElement): Button element for decrement action
- `resetBtn` (HTMLElement): Button element for reset action

**Returns:** void

**Example:**
```javascript
import { setupCounter } from './js/counter.js';

const counterDisplay = document.querySelector('#counter');
const incrementBtn = document.querySelector('#increment-btn');
const decrementBtn = document.querySelector('#decrement-btn');
const resetBtn = document.querySelector('#reset-btn');

setupCounter(counterDisplay, incrementBtn, decrementBtn, resetBtn);
```

### `getCounterValue()`
Retrieves the current counter value.

**Parameters:** None

**Returns:** number - The current counter value

**Example:**
```javascript
import { getCounterValue } from './js/counter.js';

const currentValue = getCounterValue();
console.log(`Current counter value: ${currentValue}`);
```

## UI Components

### HTML Structure
```html
<section class="card counter-card">
  <h2>Counter App</h2>
  <div class="counter-display">
    <span id="counter">0</span>
  </div>
  <div class="counter-controls">
    <button id="increment-btn" class="button button-increment" type="button">
      Increment
    </button>
    <button id="decrement-btn" class="button button-decrement" type="button">
      Decrement
    </button>
    <button id="reset-btn" class="button button-reset" type="button">
      Reset
    </button>
  </div>
</section>
```

## Design Alignment

The implementation follows the Figma design specifications:
- **Color Scheme**: Matches the purple background (#5826FF) theme
- **Button Styles**: 
  - Increment: Yellow (#FFDB10)
  - Decrement: Red (#FF0000)
  - Reset: Blue (Primary color)
- **Typography**: Inter font family, centered text
- **Layout**: Responsive flex layout with proper spacing

## Testing

To test the counter functionality:
1. Open `test-counter.html` in a browser
2. All tests should pass (green checkmarks)
3. Tests verify:
   - Initial value is 0
   - Increment increases value
   - Decrement decreases value
   - Reset returns to 0
   - All operations work from any state

## Accessibility

- All buttons have proper `type="button"` attributes
- Semantic HTML structure
- Keyboard accessible (tab navigation)
- Clear visual feedback on hover and active states
- Focus indicators for keyboard navigation

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

Potential improvements:
- Add min/max value constraints
- Add step size configuration (increment/decrement by custom amounts)
- Add animation transitions for value changes
- Add keyboard shortcuts (arrow keys, 'R' for reset)
- Persist counter value in localStorage
- Add undo/redo functionality
