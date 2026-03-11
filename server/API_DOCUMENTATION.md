# Counter API Documentation

## Overview

The Counter API provides endpoints for managing a counter value with operations including increment, decrement, reset, and retrieval.

**Base URL:** `http://localhost:3000/api`

**Version:** 1.0.0

## Table of Contents

- [Getting Started](#getting-started)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Get Counter Value](#get-counter-value)
  - [Increment Counter](#increment-counter)
  - [Decrement Counter](#decrement-counter)
  - [Reset Counter](#reset-counter)
  - [Health Check](#health-check)
  - [API Documentation](#api-documentation)

---

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
npm run server
```

The server will start on `http://localhost:3000`

### Testing the API

You can test the API using:
- cURL
- Postman
- Any HTTP client library
- Browser (for GET requests)

---

## Error Handling

The API implements comprehensive error handling for all endpoints.

### Error Response Format

```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "field": "fieldName",
  "receivedValue": "value",
  "receivedType": "type"
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input data |
| 404  | Not Found - Endpoint doesn't exist |
| 500  | Internal Server Error - Unexpected server error |

### Validation Rules

- **amount** (for increment/decrement):
  - Must be a valid number
  - Must be positive (> 0)
  - Must be finite
  - Default: 1

- **value** (for reset):
  - Must be a valid number if provided
  - Must be finite
  - Default: 0

---

## Endpoints

### Get Counter Value

Retrieves the current counter value.

**Endpoint:** `GET /api/counter`

**Request:**
```bash
curl http://localhost:3000/api/counter
```

**Success Response (200):**
```json
{
  "value": 5,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Increment Counter

Increments the counter by a specified amount (default: 1).

**Endpoint:** `POST /api/counter/increment`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (optional):**
```json
{
  "amount": 5
}
```

**Examples:**

1. Increment by 1 (default):
```bash
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json"
```

2. Increment by custom amount:
```bash
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'
```

**Success Response (200):**
```json
{
  "value": 10,
  "previousValue": 5,
  "change": 5,
  "operation": "increment",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Bad Request",
  "message": "Amount must be a positive number",
  "field": "amount",
  "receivedValue": -5
}
```

**Validation Errors:**
- Amount is not a number
- Amount is negative or zero
- Amount is not finite (Infinity or NaN)

---

### Decrement Counter

Decrements the counter by a specified amount (default: 1).

**Endpoint:** `POST /api/counter/decrement`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (optional):**
```json
{
  "amount": 3
}
```

**Examples:**

1. Decrement by 1 (default):
```bash
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json"
```

2. Decrement by custom amount:
```bash
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json" \
  -d '{"amount": 3}'
```

**Success Response (200):**
```json
{
  "value": 7,
  "previousValue": 10,
  "change": -3,
  "operation": "decrement",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Bad Request",
  "message": "Amount must be a valid number",
  "field": "amount",
  "receivedValue": "invalid",
  "receivedType": "string"
}
```

**Validation Errors:**
- Amount is not a number
- Amount is negative or zero
- Amount is not finite (Infinity or NaN)

---

### Reset Counter

Resets the counter to zero or a specified value.

**Endpoint:** `POST /api/counter/reset`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (optional):**
```json
{
  "value": 100
}
```

**Examples:**

1. Reset to 0 (default):
```bash
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json"
```

2. Reset to custom value:
```bash
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json" \
  -d '{"value": 100}'
```

**Success Response (200):**
```json
{
  "value": 100,
  "previousValue": 7,
  "operation": "reset",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Bad Request",
  "message": "Value must be a valid number",
  "field": "value",
  "receivedValue": "abc",
  "receivedType": "string"
}
```

**Validation Errors:**
- Value is not a number
- Value is not finite (Infinity or NaN)

---

### Health Check

Check if the API server is running.

**Endpoint:** `GET /api/health`

**Request:**
```bash
curl http://localhost:3000/api/health
```

**Success Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### API Documentation

Get API documentation in JSON format.

**Endpoint:** `GET /api/docs`

**Request:**
```bash
curl http://localhost:3000/api/docs
```

**Success Response (200):**
```json
{
  "title": "Counter API Documentation",
  "version": "1.0.0",
  "baseUrl": "/api",
  "endpoints": [...]
}
```

---

## Usage Examples

### JavaScript/Node.js

```javascript
// Get counter value
const response = await fetch('http://localhost:3000/api/counter');
const data = await response.json();
console.log(data.value);

// Increment counter
const incrementResponse = await fetch('http://localhost:3000/api/counter/increment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 5 })
});
const incrementData = await incrementResponse.json();
console.log(incrementData);

// Decrement counter
const decrementResponse = await fetch('http://localhost:3000/api/counter/decrement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 2 })
});
const decrementData = await decrementResponse.json();
console.log(decrementData);

// Reset counter
const resetResponse = await fetch('http://localhost:3000/api/counter/reset', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ value: 0 })
});
const resetData = await resetResponse.json();
console.log(resetData);
```

### Python

```python
import requests

# Get counter value
response = requests.get('http://localhost:3000/api/counter')
print(response.json())

# Increment counter
response = requests.post(
    'http://localhost:3000/api/counter/increment',
    json={'amount': 5}
)
print(response.json())

# Decrement counter
response = requests.post(
    'http://localhost:3000/api/counter/decrement',
    json={'amount': 2}
)
print(response.json())

# Reset counter
response = requests.post(
    'http://localhost:3000/api/counter/reset',
    json={'value': 0}
)
print(response.json())
```

---

## Error Handling Best Practices

1. **Always check response status codes** before processing data
2. **Handle validation errors** by checking the error response structure
3. **Implement retry logic** for 500-level errors
4. **Log errors** for debugging purposes
5. **Provide user-friendly error messages** in your application

---

## Architecture

### Project Structure

```
server/
├── index.js                    # Main server file
├── routes/
│   └── counter.js             # Counter routes
├── controllers/
│   └── counterController.js   # Counter business logic
├── middleware/
│   ├── validation.js          # Input validation
│   └── errorHandler.js        # Error handling
└── API_DOCUMENTATION.md       # This file
```

### Design Patterns

- **MVC Pattern**: Separation of routes, controllers, and models
- **Middleware Pattern**: Validation and error handling as middleware
- **RESTful Design**: Standard HTTP methods and status codes
- **Error-First Approach**: Comprehensive error handling throughout

---

## Future Enhancements

Potential improvements for production use:

1. **Database Integration**: Replace in-memory storage with persistent database
2. **Authentication**: Add API key or JWT authentication
3. **Rate Limiting**: Prevent abuse with request rate limits
4. **Request Logging**: Add detailed request/response logging
5. **Metrics & Monitoring**: Track API usage and performance
6. **Caching**: Implement caching for better performance
7. **Versioning**: Support multiple API versions
8. **WebSocket Support**: Real-time counter updates
9. **Testing**: Add comprehensive unit and integration tests
10. **OpenAPI/Swagger**: Generate interactive API documentation

---

## Support

For issues or questions:
1. Check this documentation
2. Review error messages carefully
3. Check server logs
4. Test with simple curl commands first

---

## License

MIT
