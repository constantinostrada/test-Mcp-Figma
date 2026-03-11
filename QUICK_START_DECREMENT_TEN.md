# Quick Start Guide: Decrement-by-Ten Feature

## 🚀 Getting Started

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Start the Backend Server
```bash
npm run server
```
The API will be available at `http://localhost:3000/api`

### 3. Start the Frontend (in another terminal)
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 4. Test the Feature
Open your browser and navigate to `http://localhost:5173`

You should see:
- A counter display showing the current value
- Two buttons:
  - **Increment** (blue) - Increases counter by 1
  - **Decrement by 10** (red) - Decreases counter by 10

## 🧪 Testing

### Automated Test
```bash
# Make sure server is running, then:
npm run test:api
```

### Manual Feature Test
```bash
# Make sure server is running, then:
node test-decrement-ten.js
```

## 📡 API Usage

### Using cURL
```bash
# Decrement by 10
curl -X POST http://localhost:3000/api/counter/decrement-ten \
  -H "Content-Type: application/json"

# Check current value
curl http://localhost:3000/api/counter
```

### Using JavaScript
```javascript
// Decrement by 10
const response = await fetch('http://localhost:3000/api/counter/decrement-ten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data); // { value: ..., previousValue: ..., change: -10, ... }
```

## 📋 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/counter` | Get current counter value |
| POST | `/api/counter/increment` | Increment by amount (default: 1) |
| POST | `/api/counter/decrement` | Decrement by amount (default: 1) |
| POST | `/api/counter/decrement-ten` | **Decrement by 10** ⭐ NEW |
| POST | `/api/counter/reset` | Reset to value (default: 0) |
| GET | `/api/health` | Health check |
| GET | `/api/docs` | API documentation |

## 🎨 UI Features

- **Counter Display**: Shows current counter value in large, highlighted text
- **Button Group**: Organized layout with two action buttons
- **Color Coding**: 
  - Blue button for increment (positive action)
  - Red button for decrement-by-ten (negative action)
- **Responsive**: Works on all screen sizes

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start frontend dev server
npm run server       # Start backend API server

# Testing  
npm run test:api     # Run all API tests
node test-decrement-ten.js  # Test decrement-by-ten specifically

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
```

## 🔍 Troubleshooting

### Button doesn't work
1. Check if backend server is running: `http://localhost:3000/api/health`
2. Open browser console (F12) and check for errors
3. Verify API_BASE_URL in `src/js/counter.js` matches your server port

### Test fails with 404
- Restart the backend server to load the new route
- Verify the route is listed: `http://localhost:3000/api/docs`

### Counter doesn't update
1. Check browser console for JavaScript errors
2. Verify network request in browser DevTools
3. Check server terminal for backend errors

## 📚 Documentation

- **Feature Details**: See `DECREMENT_BY_TEN_FEATURE.md`
- **Implementation Summary**: See `IMPLEMENTATION_SUMMARY_DECREMENT_TEN.md`
- **API Documentation**: `http://localhost:3000/api/docs` (when server is running)

## ✅ Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Browser shows counter interface with two buttons
- [ ] Increment button works (counter goes up by 1)
- [ ] Decrement by 10 button works (counter goes down by 10)
- [ ] Counter display updates immediately
- [ ] No errors in browser console
- [ ] API tests pass

## 🎯 Example Workflow

```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend  
npm run dev

# Terminal 3: Run tests
npm run test:api

# Browser: Open http://localhost:5173
# - Click "Increment" a few times
# - Click "Decrement by 10"
# - Observe counter value change
```

## 💡 Tips

1. **Live Reload**: Frontend has hot module replacement - changes appear instantly
2. **API Testing**: Use the test script for quick API verification
3. **Browser DevTools**: Network tab shows all API calls and responses
4. **Server Logs**: Watch server terminal for request/response logs

---

**Need Help?**
- Check server is running: `http://localhost:3000/api/health`
- View available endpoints: `http://localhost:3000/api/docs`
- See detailed docs: `DECREMENT_BY_TEN_FEATURE.md`
