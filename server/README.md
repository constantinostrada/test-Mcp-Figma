# Counter API Server

A RESTful API server for managing counter operations with comprehensive error handling and documentation.

## Features

✨ **Complete CRUD Operations** for counter management  
🔒 **Robust Error Handling** with detailed error messages  
📚 **Comprehensive API Documentation** (JSON and Markdown)  
✅ **Input Validation** for all endpoints  
🚀 **RESTful Design** following best practices  
📝 **Well-documented Code** with JSDoc comments  

## Quick Start

### Installation

```bash
npm install
```

### Start the Server

```bash
npm run server
```

The server will be available at: `http://localhost:3000`

### View API Documentation

- **Markdown Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **JSON Documentation**: Visit `http://localhost:3000/api/docs`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/counter` | Get current counter value |
| POST | `/api/counter/increment` | Increment counter |
| POST | `/api/counter/decrement` | Decrement counter |
| POST | `/api/counter/reset` | Reset counter to 0 or specified value |
| GET | `/api/health` | Health check endpoint |
| GET | `/api/docs` | API documentation in JSON format |

## Quick Examples

### Get Counter Value
```bash
curl http://localhost:3000/api/counter
```

### Increment Counter
```bash
# Increment by 1 (default)
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json"

# Increment by 5
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'
```

### Decrement Counter
```bash
# Decrement by 1 (default)
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json"

# Decrement by 3
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json" \
  -d '{"amount": 3}'
```

### Reset Counter
```bash
# Reset to 0 (default)
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json"

# Reset to 100
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json" \
  -d '{"value": 100}'
```

## Project Structure

```
server/
├── index.js                    # Main server & app configuration
├── routes/
│   └── counter.js             # Counter route definitions
├── controllers/
│   └── counterController.js   # Counter business logic
├── middleware/
│   ├── validation.js          # Input validation middleware
│   └── errorHandler.js        # Global error handling
├── API_DOCUMENTATION.md       # Detailed API documentation
└── README.md                  # This file
```

## Error Handling

The API implements comprehensive error handling:

- **Validation Errors (400)**: Invalid input data
- **Not Found Errors (404)**: Invalid endpoints
- **Server Errors (500)**: Unexpected server errors

Example error response:
```json
{
  "error": "Bad Request",
  "message": "Amount must be a positive number",
  "field": "amount",
  "receivedValue": -5
}
```

## Validation Rules

### Increment/Decrement
- `amount` must be a number
- `amount` must be positive (> 0)
- `amount` must be finite
- Default value: 1

### Reset
- `value` must be a number if provided
- `value` must be finite
- Default value: 0

## Development

### Code Style
- ES6+ JavaScript with modules
- JSDoc comments for documentation
- Express.js best practices
- MVC architecture pattern

### Middleware Stack
1. CORS handling
2. JSON body parsing
3. Route handlers
4. Validation middleware
5. Error handling middleware

## Testing

You can test the API using:

1. **cURL** (command line)
2. **Postman** (GUI)
3. **Browser** (for GET requests)
4. **JavaScript fetch API**
5. **Any HTTP client library**

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed examples.

## Configuration

The server uses the following configuration:

- **Port**: 3000 (default) or `process.env.PORT`
- **CORS**: Enabled for all origins
- **Body Parser**: JSON with default limits

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL, etc.)
- [ ] User authentication & authorization
- [ ] Rate limiting
- [ ] Request logging
- [ ] Unit & integration tests
- [ ] OpenAPI/Swagger documentation
- [ ] WebSocket support for real-time updates
- [ ] Docker containerization
- [ ] CI/CD pipeline

## License

MIT
