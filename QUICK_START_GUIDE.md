# Quick Start Guide - Increment-by-10000 Feature

## Running the Application

### 1. Start the Backend Server
```bash
npm run server
```
Server will start on `http://localhost:3000`

### 2. Start the Frontend Development Server
```bash
npm run dev
```
Application will be available at `http://localhost:5173`

### 3. Open Your Browser
Navigate to `http://localhost:5173`

## Using the Counter

### Increment by 1
Click the **"Increment by 1"** button to increase the counter by 1.

### Increment by 10,000
Click the **"Increment by 10,000"** button to increase the counter by 10,000.

## Features

✅ **API Integration**: Counter state is synchronized with the backend API
✅ **Real-time Updates**: Changes are reflected immediately in the UI
✅ **Fallback Support**: Works locally if API is unavailable
✅ **Responsive Design**: Adapts to mobile, tablet, and desktop screens
✅ **Modern UI**: Follows design guidelines with gradient buttons and smooth animations

## Testing the API

### Run API Tests
```bash
# Terminal 1: Start the server
npm run server

# Terminal 2: Run tests
npm run test:api
```

### Test Increment by 10,000
Using curl:
```bash
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": 10000}'
```

Expected response:
```json
{
  "value": 10000,
  "previousValue": 0,
  "change": 10000,
  "operation": "increment",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Production Build

```bash
npm run build
```
Built files will be in the `dist` directory.

## Code Quality

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## Troubleshooting

### Counter Not Updating?
1. Ensure the backend server is running
2. Check browser console for errors
3. Verify API endpoint is accessible

### API Not Available?
The application will fall back to local counter mode automatically.

### Build Errors?
Run `npm install` to ensure all dependencies are installed.

## API Endpoints Reference

- `GET /api/counter` - Get current counter value
- `POST /api/counter/increment` - Increment counter (default: 1)
- `POST /api/counter/decrement` - Decrement counter (default: 1)
- `POST /api/counter/reset` - Reset counter to 0 or specified value

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Support

For detailed API documentation, see:
- `server/API_DOCUMENTATION.md`
- `INCREMENT_BY_10K_IMPLEMENTATION.md`

---

**Happy Counting! 🎉**
