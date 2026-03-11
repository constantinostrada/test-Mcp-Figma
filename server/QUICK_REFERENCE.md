# Counter API - Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm run server

# Test API (in new terminal)
npm run test:api
```

Server: `http://localhost:3000`

---

## 📍 Endpoints Cheat Sheet

### Get Counter
```bash
GET /api/counter
```

### Increment
```bash
POST /api/counter/increment
Body: {"amount": 5}  # optional, default: 1
```

### Decrement
```bash
POST /api/counter/decrement
Body: {"amount": 3}  # optional, default: 1
```

### Reset
```bash
POST /api/counter/reset
Body: {"value": 100}  # optional, default: 0
```

---

## 💻 cURL Examples

```bash
# Get counter
curl http://localhost:3000/api/counter

# Increment by 1
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json"

# Increment by 5
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'

# Decrement by 1
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json"

# Decrement by 3
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json" \
  -d '{"amount": 3}'

# Reset to 0
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json"

# Reset to 100
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json" \
  -d '{"value": 100}'
```

---

## 📦 Response Format

### Success (200)
```json
{
  "value": 5,
  "previousValue": 0,
  "change": 5,
  "operation": "increment",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error (400)
```json
{
  "error": "Bad Request",
  "message": "Amount must be a positive number",
  "field": "amount",
  "receivedValue": -5
}
```

---

## ✅ Validation Rules

| Parameter | Type | Constraint | Default |
|-----------|------|------------|---------|
| `amount` (inc/dec) | number | Must be positive (> 0) | 1 |
| `value` (reset) | number | Any finite number | 0 |

---

## 🛠️ Utility Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# API documentation
curl http://localhost:3000/api/docs
```

---

## 📚 Documentation

- **Complete API Docs**: `server/API_DOCUMENTATION.md`
- **Server README**: `server/README.md`
- **Architecture**: `server/ARCHITECTURE.md`
- **Main Guide**: `COUNTER_API_README.md`

---

## 🧪 Testing

```bash
# Run automated tests
npm run test:api

# Or import Postman collection
server/Counter-API.postman_collection.json
```

---

## ⚠️ Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Amount must be a positive number" | amount ≤ 0 | Use positive number |
| "Amount must be a valid number" | amount is not a number | Use numeric value |
| "Value must be a valid number" | value is not a number | Use numeric value |
| "Not Found" | Wrong endpoint | Check endpoint URL |

---

## 🎯 Scripts

```bash
npm run server      # Start API server
npm run test:api    # Run tests
npm run dev         # Start Vite dev server
npm run lint        # Check code quality
```

---

## 📂 Project Structure

```
server/
├── index.js              # Main server
├── routes/counter.js     # Routes
├── controllers/          # Business logic
├── middleware/           # Validation & errors
└── test-api.js          # Tests
```

---

**Need help?** Check `server/API_DOCUMENTATION.md` for detailed examples!
