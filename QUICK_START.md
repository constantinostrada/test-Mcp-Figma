# Quick Start Guide: Increment-by-4 Feature

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

```bash
npm run server
```

The server will start on `http://localhost:3000`

### 3. Start the Frontend Development Server

In a new terminal window:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Use the Feature

Open your browser and navigate to `http://localhost:5173`

You will see two buttons:
- **Increment by 1** (Blue) - Increases counter by 1
- **Increment by 4** (Green) - Increases counter by 4

## Testing

### Run All API Tests

```bash
npm run test:api
```

This runs 19 tests including the new increment-by-4 tests.

### Run Specific Increment-by-4 Test

```bash
node test-increment-by-4.js
```

This tests only the increment-by-4 functionality.

## API Usage

### Increment Counter by 4

**cURL:**
```bash
curl -X POST http://localhost:3000/api/counter/increment-by-4 \
  -H "Content-Type: application/json"
```

**JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/api/counter/increment-by-4', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data.value); // New counter value
```

**Response:**
```json
{
  "value": 4,
  "previousValue": 0,
  "change": 4,
  "operation": "increment-by-4",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Troubleshooting

### Button doesn't appear
- Make sure you've run `npm install`
- Refresh the page
- Check browser console for errors

### Counter doesn't increment
- Ensure the server is running (`npm run server`)
- Check if the server is accessible at `http://localhost:3000`
- Open browser developer tools to check for API errors

### Tests fail
- Make sure the server is running
- Check if port 3000 is available
- Restart the server and try again

## Documentation

For more details, see:
- **INCREMENT_BY_4_FEATURE.md** - Complete feature documentation
- **IMPLEMENTATION_NOTES.md** - Implementation details
- **server/API_DOCUMENTATION.md** - Full API documentation

## Support

If you encounter issues:
1. Check the server logs
2. Check browser console
3. Run the test suite
4. Review the documentation files
