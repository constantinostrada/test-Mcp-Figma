# Architecture Flow: Decrement-by-Ten Feature

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Browser                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      index.html                          │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Counter Display: <span id="counter">0</span>   │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Button Group:                                     │ │  │
│  │  │  ┌─────────────────┐  ┌──────────────────────────┐ │ │  │
│  │  │  │   Increment     │  │  Decrement by 10  ⭐     │ │ │  │
│  │  │  │  (id: counter-  │  │  (id: decrement-ten-btn) │ │ │  │
│  │  │  │      btn)       │  │                          │ │ │  │
│  │  │  └─────────────────┘  └──────────────────────────┘ │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ Loaded by                       │
│                               ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      src/main.js                         │  │
│  │                                                          │  │
│  │  • Imports setupCounter, setupDecrementByTen            │  │
│  │  • Initializes buttons on DOMContentLoaded              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ Uses                            │
│                               ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   src/js/counter.js                      │  │
│  │                                                          │  │
│  │  Functions:                                              │  │
│  │  • setupCounter(element)          - Init increment btn   │  │
│  │  • setupDecrementByTen(el, disp)  - Init decrement btn⭐ │  │
│  │  • fetchCounterValue()            - GET /counter         │  │
│  │  • incrementCounter(amount)       - POST /increment      │  │
│  │  • decrementByTen()               - POST /decrement-ten⭐│  │
│  │  • updateCounterDisplay(el, val)  - Update UI           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ HTTP Requests                   │
└───────────────────────────────┼─────────────────────────────────┘
                                │
                                │ Fetch API
                                │ http://localhost:3000/api
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                         Backend Server                          │
│                      (Express.js - Node.js)                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   server/index.js                        │  │
│  │                                                          │  │
│  │  • CORS middleware                                       │  │
│  │  • JSON body parser                                      │  │
│  │  • Routes: /api/counter/* → counterRoutes               │  │
│  │  • Error handler                                         │  │
│  │  • 404 handler                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ Routes to                       │
│                               ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               server/routes/counter.js                   │  │
│  │                                                          │  │
│  │  Routes:                                                 │  │
│  │  GET    /          → getCounter                          │  │
│  │  POST   /increment → validateCounterRequest → increment  │  │
│  │  POST   /decrement → validateCounterRequest → decrement  │  │
│  │  POST   /decrement-ten → decrementByTen ⭐               │  │
│  │  POST   /reset     → resetCounter                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ Calls                           │
│                               ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          server/controllers/counterController.js         │  │
│  │                                                          │  │
│  │  State: let counter = 0  (in-memory)                     │  │
│  │                                                          │  │
│  │  Controllers:                                            │  │
│  │  • getCounter(req, res, next)                            │  │
│  │  • incrementCounter(req, res, next)                      │  │
│  │  • decrementCounter(req, res, next)                      │  │
│  │  • decrementByTen(req, res, next) ⭐                     │  │
│  │  • resetCounter(req, res, next)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                               │                                 │
│                               │ Returns                         │
│                               ▼                                 │
│                         JSON Response                           │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow: Decrement-by-Ten

### User Action → Response Flow

```
┌──────────────┐
│   User       │
│  clicks      │
│ "Decrement   │
│  by 10"      │
│  button      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Event Listener (setupDecrementByTen)        │
│  • Triggered by click                        │
│  • Calls decrementByTen() function           │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  decrementByTen() in counter.js              │
│  • Constructs API request                    │
│  • POST /api/counter/decrement-ten           │
│  • Content-Type: application/json            │
└──────┬───────────────────────────────────────┘
       │
       │ HTTP POST Request
       │
       ▼
┌──────────────────────────────────────────────┐
│  Express Server (server/index.js)            │
│  • Receives request                          │
│  • Parses JSON body (if any)                 │
│  • Routes to /api/counter/*                  │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Router (server/routes/counter.js)           │
│  • Matches POST /decrement-ten               │
│  • No validation middleware needed           │
│  • Calls decrementByTen controller           │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Controller (decrementByTen)                 │
│  1. const amount = 10                        │
│  2. const previousValue = counter            │
│  3. counter -= amount                        │
│  4. Return JSON response                     │
└──────┬───────────────────────────────────────┘
       │
       │ JSON Response:
       │ {
       │   "value": 40,
       │   "previousValue": 50,
       │   "change": -10,
       │   "operation": "decrement-by-ten",
       │   "timestamp": "2024-..."
       │ }
       │
       ▼
┌──────────────────────────────────────────────┐
│  Frontend receives response                  │
│  • Extracts data.value                       │
│  • Calls updateCounterDisplay()              │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  updateCounterDisplay(displayElement, value) │
│  • Updates <span id="counter">              │
│  • Sets textContent to new value             │
└──────┬───────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│   UI Updates │
│   Counter    │
│   shows 40   │
│   (was 50)   │
└──────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Data States                            │
└─────────────────────────────────────────────────────────────┘

Initial State:
┌──────────────┐                    ┌──────────────┐
│   Frontend   │                    │   Backend    │
│  Counter: ?  │                    │  counter: 50 │
└──────────────┘                    └──────────────┘

After Page Load (fetchCounterValue):
┌──────────────┐     GET /counter   ┌──────────────┐
│   Frontend   │◄───────────────────│   Backend    │
│  Counter: 50 │                    │  counter: 50 │
└──────────────┘                    └──────────────┘

After Click "Decrement by 10":
┌──────────────┐  POST /decrement-ten  ┌──────────────┐
│   Frontend   │──────────────────────►│   Backend    │
│  Counter: 50 │                       │  counter: 50 │
└──────────────┘                       └──────┬───────┘
                                              │
                                              │ counter -= 10
                                              ▼
                                       ┌──────────────┐
                                       │   Backend    │
                                       │  counter: 40 │
                                       └──────┬───────┘
                                              │
       Response: { value: 40, ... }           │
┌──────────────┐                              │
│   Frontend   │◄─────────────────────────────┘
│  Counter: 40 │
└──────────────┘

Final State (Synchronized):
┌──────────────┐                    ┌──────────────┐
│   Frontend   │                    │   Backend    │
│  Counter: 40 │    (In Sync)       │  counter: 40 │
└──────────────┘                    └──────────────┘
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Layers                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Presentation Layer (HTML + CSS)                            │
│  • index.html - Structure                                   │
│  • style.css - Styling (.button-secondary for red button)   │
│  • Displays counter value                                   │
│  • Shows buttons                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Application Layer (JavaScript)                             │
│  • main.js - Initialization                                 │
│  • counter.js - Business logic                              │
│  • Event handlers                                           │
│  • API communication                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Network Layer (HTTP/Fetch)                                 │
│  • Fetch API calls                                          │
│  • JSON serialization/deserialization                       │
│  • Error handling                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Server Layer (Express.js)                                  │
│  • Routing                                                  │
│  • Middleware                                               │
│  • Error handling                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Business Logic Layer (Controllers)                         │
│  • Counter state management                                 │
│  • Operation logic (decrement by 10)                        │
│  • Response formatting                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Data Layer (In-Memory Storage)                             │
│  • let counter = 0                                          │
│  • Simple variable storage                                  │
│  • (Could be replaced with database)                        │
└─────────────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
Error at any point:
                                
Frontend Error (e.g., network failure):
┌──────────────┐     Request fails    ┌──────────────┐
│  counter.js  │────────X─────────────│   Backend    │
│              │                       └──────────────┘
│  catch block │
│  logs error  │
│  returns null│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ UI remains   │
│ unchanged    │
│ (graceful    │
│  degradation)│
└──────────────┘


Backend Error (e.g., exception in controller):
┌──────────────┐                       ┌──────────────┐
│   Frontend   │                       │  Controller  │
│              │                       │  throws error│
└──────────────┘                       └──────┬───────┘
       ▲                                      │
       │                                      ▼
       │                               ┌──────────────┐
       │                               │ next(error)  │
       │                               └──────┬───────┘
       │                                      │
       │                                      ▼
       │                               ┌──────────────┐
       │                               │ errorHandler │
       │                               │  middleware  │
       │                               └──────┬───────┘
       │                                      │
       │  Response: 500 Internal Error       │
       └─────────────────────────────────────┘
```

## File Dependencies

```
index.html
   │
   ├─► main.js
   │     │
   │     ├─► counter.js
   │     │     │
   │     │     └─► Calls API: /api/counter/decrement-ten
   │     │
   │     └─► utils.js
   │
   └─► style.css

server/index.js
   │
   ├─► routes/counter.js
   │     │
   │     └─► controllers/counterController.js
   │
   ├─► middleware/validation.js
   │
   └─► middleware/errorHandler.js
```

## Summary

The decrement-by-ten feature follows a clean, layered architecture:

1. **UI Layer**: HTML button triggers event
2. **Application Layer**: JavaScript handler calls API
3. **Network Layer**: Fetch sends HTTP request
4. **Server Layer**: Express routes request
5. **Business Layer**: Controller processes logic
6. **Data Layer**: Counter state updated
7. **Response Path**: JSON returned → UI updated

**Key Points**:
- ⭐ New components marked with star
- Clean separation of concerns
- Unidirectional data flow
- Error handling at each layer
- State synchronized between frontend and backend
