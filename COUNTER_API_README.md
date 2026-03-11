# Counter API - Complete Implementation

This project provides a production-ready RESTful API for counter operations with comprehensive documentation, error handling, and validation.

## 🎯 Features

### ✅ Acceptance Criteria Met

1. **✅ Endpoints for incrementing and decrementing the counter**
   - POST `/api/counter/increment` - Increment by 1 or custom amount
   - POST `/api/counter/decrement` - Decrement by 1 or custom amount
   - POST `/api/counter/reset` - Reset to 0 or custom value
   - GET `/api/counter` - Get current counter value

2. **✅ API documentation for endpoints**
   - Comprehensive Markdown documentation ([server/API_DOCUMENTATION.md](server/API_DOCUMENTATION.md))
   - Interactive JSON documentation endpoint (GET `/api/docs`)
   - Postman collection for easy testing ([server/Counter-API.postman_collection.json](server/Counter-API.postman_collection.json))
   - JSDoc comments in all code files

3. **✅ Error handling for invalid requests**
   - Global error handling middleware
   - Input validation middleware
   - Detailed error messages with field information
   - Proper HTTP status codes (400, 404, 500)
   - Type checking and value validation

### 🚀 Additional Features

- Health check endpoint
- CORS support
- Structured project architecture (MVC pattern)
- Automated test suite
- Multiple documentation formats
- Production-ready code quality

## 📁 Project Structure

```
project/
├── server/
│   ├── index.js                         # Main server file
│   ├── routes/
│   │   └── counter.js                  # Route definitions
│   ├── controllers/
│   │   └── counterController.js        # Business logic
│   ├── middleware/
│   │   ├── validation.js               # Input validation
│   │   └── errorHandler.js             # Error handling
│   ├── test-api.js                     # Automated test suite
│   ├── README.md                       # Server documentation
│   ├── API_DOCUMENTATION.md            # Complete API docs
│   └── Counter-API.postman_collection.json  # Postman collection
├── package.json                         # Project configuration
└── COUNTER_API_README.md               # This file
```

## 🏃 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Start the Server

```bash
npm run server
```

Server will start at: `http://localhost:3000`

### 3. Test the API

Open a new terminal and run:

```bash
npm run test:api
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/counter` | Get current counter value |
| POST | `/counter/increment` | Increment counter |
| POST | `/counter/decrement` | Decrement counter |
| POST | `/counter/reset` | Reset counter |
| GET | `/health` | Health check |
| GET | `/docs` | API documentation |

## 💡 Usage Examples

### Get Counter Value

```bash
curl http://localhost:3000/api/counter
```

**Response:**
```json
{
  "value": 0,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Increment Counter

```bash
# Increment by 1 (default)
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json"

# Increment by custom amount
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": 5}'
```

**Response:**
```json
{
  "value": 5,
  "previousValue": 0,
  "change": 5,
  "operation": "increment",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Decrement Counter

```bash
# Decrement by 1 (default)
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json"

# Decrement by custom amount
curl -X POST http://localhost:3000/api/counter/decrement \
  -H "Content-Type: application/json" \
  -d '{"amount": 3}'
```

**Response:**
```json
{
  "value": 2,
  "previousValue": 5,
  "change": -3,
  "operation": "decrement",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Reset Counter

```bash
# Reset to 0 (default)
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json"

# Reset to custom value
curl -X POST http://localhost:3000/api/counter/reset \
  -H "Content-Type: application/json" \
  -d '{"value": 100}'
```

**Response:**
```json
{
  "value": 100,
  "previousValue": 2,
  "operation": "reset",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Error Handling

### Validation Errors (400)

The API validates all inputs and returns detailed error messages:

**Example: Invalid increment amount**
```bash
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": -5}'
```

**Error Response:**
```json
{
  "error": "Bad Request",
  "message": "Amount must be a positive number",
  "field": "amount",
  "receivedValue": -5
}
```

**Example: Invalid data type**
```bash
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"amount": "five"}'
```

**Error Response:**
```json
{
  "error": "Bad Request",
  "message": "Amount must be a valid number",
  "field": "amount",
  "receivedValue": "five",
  "receivedType": "string"
}
```

### Validation Rules

**For increment/decrement:**
- `amount` must be a number
- `amount` must be positive (> 0)
- `amount` must be finite
- Default: 1

**For reset:**
- `value` must be a number if provided
- `value` must be finite
- Default: 0

## 📖 Documentation

### Available Documentation

1. **Complete API Documentation**: [server/API_DOCUMENTATION.md](server/API_DOCUMENTATION.md)
   - Detailed endpoint descriptions
   - Request/response examples
   - Error handling guide
   - Code examples in multiple languages

2. **Server README**: [server/README.md](server/README.md)
   - Quick start guide
   - Project structure
   - Development guide

3. **Interactive JSON Documentation**:
   ```bash
   curl http://localhost:3000/api/docs
   ```

4. **Postman Collection**: [server/Counter-API.postman_collection.json](server/Counter-API.postman_collection.json)
   - Import into Postman for easy testing
   - Includes all endpoints with examples
   - Pre-configured error scenarios

## 🧪 Testing

### Automated Test Suite

The project includes a comprehensive test suite that validates all endpoints and error scenarios:

```bash
# Start the server first
npm run server

# In another terminal, run tests
npm run test:api
```

The test suite validates:
- ✅ All successful operations
- ✅ Error handling for invalid inputs
- ✅ Validation rules
- ✅ Response formats
- ✅ HTTP status codes

### Manual Testing

You can test the API using:
- **cURL** (command line)
- **Postman** (import the provided collection)
- **Browser** (for GET requests)
- **Any HTTP client library**

## 🏗️ Architecture

### Design Patterns

- **MVC Pattern**: Separation of concerns (routes, controllers, models)
- **Middleware Pattern**: Validation and error handling as middleware
- **RESTful Design**: Standard HTTP methods and status codes
- **Error-First Approach**: Comprehensive error handling

### Code Organization

```
server/
├── index.js              # Express app setup, middleware, routes
├── routes/               # Route definitions (URL mappings)
├── controllers/          # Business logic (counter operations)
└── middleware/           # Reusable middleware (validation, errors)
```

### Key Components

1. **Server (index.js)**
   - Express configuration
   - Middleware setup
   - Route registration
   - Error handling

2. **Routes (routes/counter.js)**
   - URL to controller mapping
   - Middleware application
   - JSDoc documentation

3. **Controllers (controllers/counterController.js)**
   - Business logic
   - Counter operations
   - Response formatting

4. **Middleware**
   - **validation.js**: Input validation
   - **errorHandler.js**: Global error handling

## 🔧 Configuration

### Environment Variables

The server supports the following environment variables:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### CORS

CORS is enabled for all origins by default. For production, configure specific origins:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## 📦 Dependencies

### Production Dependencies
- **express**: Web server framework
- **cors**: CORS middleware

### Development Dependencies
- **vite**: Build tool
- **eslint**: Code linting
- **prettier**: Code formatting

## 🚀 Deployment

### Production Considerations

1. **Database**: Replace in-memory storage with persistent database
2. **Authentication**: Add API key or JWT authentication
3. **Rate Limiting**: Implement rate limiting
4. **Logging**: Add request/response logging
5. **Monitoring**: Set up health checks and metrics
6. **Environment Variables**: Use proper env configuration
7. **HTTPS**: Enable SSL/TLS

### Docker (Future)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY server ./server
EXPOSE 3000
CMD ["node", "server/index.js"]
```

## 📝 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Server | `npm run server` | Start the API server |
| Test | `npm run test:api` | Run automated tests |
| Dev | `npm run dev` | Start Vite dev server |
| Build | `npm run build` | Build for production |
| Lint | `npm run lint` | Check code quality |
| Format | `npm run format` | Format code |

## 🎓 Learning Resources

### Code Comments

All code files include comprehensive JSDoc comments:
- Function descriptions
- Parameter types
- Return types
- Usage examples

### Best Practices Demonstrated

- ✅ Input validation
- ✅ Error handling
- ✅ RESTful API design
- ✅ Middleware usage
- ✅ Code organization
- ✅ Documentation
- ✅ Testing

## 🤝 Contributing

To contribute:
1. Follow existing code patterns
2. Add JSDoc comments
3. Update documentation
4. Test your changes
5. Run linting and formatting

## 📄 License

MIT

---

## 📞 Support

### Getting Help

1. **Check the documentation**:
   - [API_DOCUMENTATION.md](server/API_DOCUMENTATION.md)
   - [server/README.md](server/README.md)

2. **Test with curl**:
   - Start with simple GET requests
   - Check error messages for validation issues

3. **Review the test suite**:
   - [server/test-api.js](server/test-api.js)
   - See examples of all endpoints

4. **Import Postman collection**:
   - [Counter-API.postman_collection.json](server/Counter-API.postman_collection.json)
   - Pre-configured requests and examples

---

**Built with ❤️ using Express.js and Node.js**
