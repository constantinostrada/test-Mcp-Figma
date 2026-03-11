# Decrement-by-Ten Button Feature

## Overview

This document describes the implementation of the decrement-by-ten button feature for the counter application. This feature adds a new button to the counter interface that decrements the counter value by 10 each time it is pressed.

## Implementation Summary

### Backend Changes

#### 1. Controller (`server/controllers/counterController.js`)
Added a new controller function `decrementByTen` that:
- Decrements the counter by exactly 10
- Returns the new counter value along with previous value and change information
- Follows the same response pattern as other counter operations

```javascript
export const decrementByTen = (req, res, next) => {
  try {
    const amount = 10;
    const previousValue = counter;
    counter -= amount;
    res.json({
      value: counter,
      previousValue,
      change: -amount,
      operation: 'decrement-by-ten',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
```

#### 2. Routes (`server/routes/counter.js`)
Added a new route:
- **Endpoint**: `POST /api/counter/decrement-ten`
- **Description**: Decrements the counter by ten
- **No request body required**
- **Response**: JSON with counter value, previous value, change, and operation type

#### 3. Server Configuration (`server/index.js`)
Updated:
- API documentation to include the new endpoint
- 404 handler to list the new endpoint in available routes

### Frontend Changes

#### 1. Counter Module (`src/js/counter.js`)
Added:
- `decrementByTen()` - API function to call the decrement-by-ten endpoint
- `setupDecrementByTen()` - Function to setup the decrement-by-ten button event handler
- Exported `decrementCounter()` for potential future use
- Added proper error handling and console logging

#### 2. HTML (`index.html`)
Updated the counter interface:
- Restructured the counter display with a dedicated counter value display
- Added a button group to hold multiple counter operation buttons
- Added the "Decrement by 10" button with ID `decrement-ten-btn`

#### 3. Main Entry Point (`src/main.js`)
Updated:
- Imported `setupDecrementByTen` function
- Added setup code for the decrement-by-ten button

#### 4. Styles (`src/style.css`)
Added:
- `.counter-display` - Container for the counter value display
- `.counter-value` - Styling for the counter value text
- `.button-group` - Flexbox container for buttons
- `.button-primary` - Styling for the increment button (blue)
- `.button-secondary` - Styling for the decrement-by-ten button (red)
- Responsive button styling with proper spacing

## API Documentation

### Decrement by Ten Endpoint

**Endpoint**: `POST /api/counter/decrement-ten`

**Request**: No body required

**Response**:
```json
{
  "value": 40,
  "previousValue": 50,
  "change": -10,
  "operation": "decrement-by-ten",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example Usage**:

```bash
# Using cURL
curl -X POST http://localhost:3000/api/counter/decrement-ten \
  -H "Content-Type: application/json"

# Using JavaScript/Fetch
const response = await fetch('http://localhost:3000/api/counter/decrement-ten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data.value);
```

## Testing

### Automated Tests
The feature includes a test case in `server/test-api.js` that verifies:
- The endpoint is accessible
- The counter is correctly decremented by 10
- The response format is correct

### Manual Testing
A dedicated test script `test-decrement-ten.js` is provided for focused testing:

```bash
# Make sure server is running
npm run server

# In another terminal, run the test
node test-decrement-ten.js
```

## Acceptance Criteria Status

✅ **A decrement-by-ten button is included in the counter interface**
- Button added to HTML with proper styling and placement

✅ **Pressing the button decreases the counter value by 10**
- Backend endpoint correctly decrements by 10
- Frontend button properly calls the API

✅ **All views and API responses accurately reflect the change**
- Counter display updates in real-time
- API response includes all relevant information (value, previousValue, change, operation)

## Usage Instructions

### Starting the Application

1. **Start the backend server**:
   ```bash
   npm run server
   ```

2. **Start the frontend development server** (in another terminal):
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

### Using the Decrement-by-Ten Button

1. Open the application in your browser
2. The counter display shows the current value
3. Click the "Decrement by 10" button (red button on the right)
4. The counter value will decrease by 10
5. The display updates immediately to show the new value

## Technical Details

### Frontend-Backend Integration
- Frontend uses Fetch API to communicate with the backend
- All counter operations go through the API
- Counter state is persisted on the backend (in-memory)
- Real-time updates when any operation is performed

### Error Handling
- Backend: Uses try-catch blocks and error middleware
- Frontend: Catches fetch errors and logs to console
- Graceful degradation if API is unavailable

### Code Quality
- All code follows ESLint and Prettier standards
- Proper JSDoc comments on all functions
- Consistent naming conventions
- Modular architecture

## Files Modified

### Backend
- `server/controllers/counterController.js` - Added decrementByTen function
- `server/routes/counter.js` - Added decrement-ten route
- `server/index.js` - Updated documentation and available routes list
- `server/test-api.js` - Added test for decrement-by-ten endpoint

### Frontend
- `index.html` - Added decrement-by-ten button and updated layout
- `src/js/counter.js` - Added API integration and button setup
- `src/main.js` - Added decrement-by-ten button initialization
- `src/style.css` - Added styling for button group and buttons

### Documentation & Testing
- `DECREMENT_BY_TEN_FEATURE.md` - This file
- `test-decrement-ten.js` - Dedicated test script

## Future Enhancements

Potential improvements:
1. Add keyboard shortcut for decrement-by-ten (e.g., Shift+D)
2. Add animation when counter value changes
3. Add sound effects for button clicks
4. Make the decrement amount configurable via settings
5. Add undo/redo functionality

## Notes

- **Server Restart Required**: After making changes to backend files, the server must be restarted for changes to take effect
- **API Base URL**: The frontend is configured to use `http://localhost:3000/api`. Adjust `API_BASE_URL` in `src/js/counter.js` if your API runs on a different port
- **CORS**: The backend has CORS enabled for cross-origin requests

## Support

For issues or questions:
1. Check the API is running: `http://localhost:3000/api/health`
2. Verify endpoint availability: `http://localhost:3000/api/docs`
3. Check browser console for frontend errors
4. Check server terminal for backend errors
