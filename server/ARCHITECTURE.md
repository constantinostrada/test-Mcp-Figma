# Counter API Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Application                       │
│              (Browser, Postman, cURL, etc.)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Request
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Express.js Server                          │
│                    (http://localhost:3000)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Middleware Stack                          │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  1. CORS Handler          ✓ Enable cross-origin       │   │
│  │  2. JSON Body Parser      ✓ Parse request body        │   │
│  │  3. Route Handler         ✓ Match endpoint            │   │
│  │  4. Validation Middleware ✓ Validate input            │   │
│  │  5. Controller            ✓ Execute business logic    │   │
│  │  6. Error Handler         ✓ Handle errors             │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │ HTTP Response
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     JSON Response                                │
│   { value: 5, previousValue: 0, operation: "increment" }       │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Successful Request Flow

```
Client Request
      │
      ▼
┌──────────────────┐
│   POST /api/     │
│   counter/       │
│   increment      │
│   {amount: 5}    │
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  CORS Middleware │ ─── Enable cross-origin requests
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│ JSON Body Parser │ ─── Parse {"amount": 5}
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  Route Matcher   │ ─── Match /counter/increment → counter.js
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│   Validation     │ ─── Check: amount is number, positive, finite
│   Middleware     │      ✓ Valid
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│   Controller     │ ─── Execute: counter += amount
│  incrementCounter│      previousValue = 0
└─────────┬────────┘      newValue = 5
          │
          ▼
┌──────────────────┐
│  Send Response   │ ─── Status: 200
│     (200 OK)     │      Body: {value: 5, previousValue: 0, ...}
└──────────────────┘
```

### 2. Error Request Flow

```
Client Request
      │
      ▼
┌──────────────────┐
│   POST /api/     │
│   counter/       │
│   increment      │
│   {amount: -5}   │  ❌ Invalid: negative number
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  CORS Middleware │
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│ JSON Body Parser │ ─── Parse {"amount": -5}
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  Route Matcher   │ ─── Match /counter/increment
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│   Validation     │ ─── Check: amount is positive?
│   Middleware     │      ❌ FAIL: -5 is not positive
└─────────┬────────┘
          │
          ▼
┌──────────────────┐
│  Send Error      │ ─── Status: 400
│  Response        │      Body: {error: "Bad Request", ...}
│  (400 Bad Req)   │
└──────────────────┘
```

## Component Architecture

### Directory Structure

```
server/
│
├── index.js                      # Main application entry point
│   ├── App configuration
│   ├── Middleware registration
│   ├── Route registration
│   └── Error handling
│
├── routes/
│   └── counter.js               # Route definitions
│       ├── GET /counter
│       ├── POST /counter/increment
│       ├── POST /counter/decrement
│       └── POST /counter/reset
│
├── controllers/
│   └── counterController.js     # Business logic
│       ├── getCounter()
│       ├── incrementCounter()
│       ├── decrementCounter()
│       └── resetCounter()
│
└── middleware/
    ├── validation.js            # Input validation
    │   └── validateCounterRequest()
    │
    └── errorHandler.js          # Global error handling
        └── errorHandler()
```

## Data Flow Diagram

### Counter State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    In-Memory Storage                         │
│                     let counter = 0                          │
└──────────────┬──────────────────────────────────────────────┘
               │
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌─────────┐         ┌─────────┐
│  Read   │         │  Write  │
│         │         │         │
│  GET    │         │  POST   │
│ /counter│         │ /counter│
│         │         │ /increment
└─────────┘         │ /decrement
                    │ /reset
                    └─────────┘
```

### Operation Flow

```
GET /counter
     │
     ├─→ Read counter value
     │
     └─→ Return { value: counter, timestamp: ... }


POST /counter/increment
     │
     ├─→ Validate amount
     │
     ├─→ previousValue = counter
     │
     ├─→ counter = counter + amount
     │
     └─→ Return { value, previousValue, change, operation, ... }


POST /counter/decrement
     │
     ├─→ Validate amount
     │
     ├─→ previousValue = counter
     │
     ├─→ counter = counter - amount
     │
     └─→ Return { value, previousValue, change, operation, ... }


POST /counter/reset
     │
     ├─→ Validate value (if provided)
     │
     ├─→ previousValue = counter
     │
     ├─→ counter = value || 0
     │
     └─→ Return { value, previousValue, operation, ... }
```

## Middleware Pipeline

```
Request
   │
   ▼
┌───────────────────────────────────────────────────────────┐
│ 1. CORS Middleware                                        │
│    • Set Access-Control headers                           │
│    • Allow cross-origin requests                          │
└───────────────────────────────────────────────────────────┘
   │
   ▼
┌───────────────────────────────────────────────────────────┐
│ 2. Body Parser (express.json())                           │
│    • Parse JSON request body                              │
│    • Make available as req.body                           │
└───────────────────────────────────────────────────────────┘
   │
   ▼
┌───────────────────────────────────────────────────────────┐
│ 3. Route Matching                                         │
│    • Match URL to route handler                           │
│    • Extract parameters                                   │
└───────────────────────────────────────────────────────────┘
   │
   ▼
┌───────────────────────────────────────────────────────────┐
│ 4. Validation Middleware (if applicable)                  │
│    • Validate request data                                │
│    • Check types and values                               │
│    • Return 400 if invalid                                │
└───────────────────────────────────────────────────────────┘
   │
   ▼
┌───────────────────────────────────────────────────────────┐
│ 5. Controller                                             │
│    • Execute business logic                               │
│    • Update counter state                                 │
│    • Prepare response                                     │
└───────────────────────────────────────────────────────────┘
   │
   ├─ Success → Send 200 Response
   │
   └─ Error → ▼
┌───────────────────────────────────────────────────────────┐
│ 6. Error Handler Middleware                               │
│    • Catch all errors                                     │
│    • Format error response                                │
│    • Log error details                                    │
│    • Send 400/404/500 Response                            │
└───────────────────────────────────────────────────────────┘
   │
   ▼
Response
```

## Error Handling Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    Error Sources                         │
└────────┬───────────────────────┬────────────────────────┘
         │                       │
         │                       │
    ┌────▼─────┐          ┌──────▼──────┐
    │ Validation│          │  Runtime    │
    │  Errors   │          │  Errors     │
    └────┬──────┘          └──────┬──────┘
         │                        │
         └───────┬────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │   Error Handler        │
    │   Middleware           │
    └────────┬───────────────┘
             │
    ┌────────▼────────────────────────────┐
    │  Format Error Response              │
    │  • error: "Error Type"              │
    │  • message: "Detailed message"      │
    │  • field: "fieldName" (if applicable)│
    │  • receivedValue: value             │
    │  • receivedType: type               │
    └────────┬────────────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ HTTP Status Code   │
    │  • 400 - Bad Req   │
    │  • 404 - Not Found │
    │  • 500 - Server Err│
    └────────────────────┘
```

## API Response Structure

### Success Response

```javascript
{
  value: number,           // Current counter value
  previousValue: number,   // Previous counter value (for mutations)
  change: number,          // Amount changed (for increment/decrement)
  operation: string,       // Operation type: "increment" | "decrement" | "reset"
  timestamp: string        // ISO 8601 timestamp
}
```

### Error Response

```javascript
{
  error: string,           // Error type
  message: string,         // Human-readable error message
  field: string,           // Field that caused the error (optional)
  receivedValue: any,      // The invalid value received (optional)
  receivedType: string     // Type of the invalid value (optional)
}
```

## Validation Strategy

```
Input Validation
       │
       ▼
┌─────────────────────────────────────────┐
│  Type Check                              │
│  • typeof value === 'number'            │
│  • !isNaN(value)                        │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Value Check                             │
│  • amount > 0 (for inc/dec)             │
│  • isFinite(value)                      │
└───────────┬─────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  Pass to Controller                      │
│  or                                      │
│  Return 400 Error                        │
└─────────────────────────────────────────┘
```

## Technology Stack

```
┌──────────────────────────────────────────────────────┐
│                   Node.js Runtime                    │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                   Express.js                         │
│  • Routing                                           │
│  • Middleware                                        │
│  • HTTP utilities                                    │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│                   Middleware                         │
│  • CORS - Cross-origin support                       │
│  • express.json() - JSON parsing                     │
│  • Custom validation                                 │
│  • Custom error handling                             │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│               Application Code                       │
│  • Routes                                            │
│  • Controllers                                       │
│  • Business Logic                                    │
└──────────────────────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────┐
│        Security Layers                  │
├─────────────────────────────────────────┤
│  1. CORS - Origin validation            │
│  2. Input Validation - Type & value     │
│  3. Error Handling - No stack traces    │
│  4. JSON Parsing - Syntax validation    │
└─────────────────────────────────────────┘

Future Enhancements:
  • Rate Limiting
  • Authentication (JWT, API Keys)
  • Request Size Limits
  • HTTPS/TLS
  • Input Sanitization
```

## Performance Characteristics

```
Operation Complexity:
  • GET /counter:         O(1)
  • POST /increment:      O(1)
  • POST /decrement:      O(1)
  • POST /reset:          O(1)

Storage:
  • In-memory: O(1) space
  • Single integer value

Response Time:
  • Typical: < 10ms
  • With validation: < 15ms
```

## Future Architecture

```
Current: In-Memory Storage
┌──────────────────┐
│  Express Server  │
│  ┌────────────┐  │
│  │  counter   │  │
│  └────────────┘  │
└──────────────────┘

Future: Database-Backed
┌──────────────────┐       ┌──────────────────┐
│  Express Server  │ ◄───► │    Database      │
│                  │       │  (MongoDB/SQL)   │
└──────────────────┘       └──────────────────┘

Future: Microservices
┌──────────────────┐       ┌──────────────────┐
│   API Gateway    │ ◄───► │ Counter Service  │
└──────────────────┘       └──────────────────┘
        │                           │
        ▼                           ▼
┌──────────────────┐       ┌──────────────────┐
│  Auth Service    │       │   Database       │
└──────────────────┘       └──────────────────┘
```

---

This architecture provides a solid foundation for a production-ready API with room for growth and enhancement.
