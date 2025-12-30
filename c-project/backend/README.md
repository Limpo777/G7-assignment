# Expense Tracking System - Backend API

A RESTful API backend for the Expense Tracking System built with Node.js, Express.js, and MongoDB.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Body: `{ name, email, password }`
  - Returns: JWT token

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: JWT token

### Expenses (Protected)

- `POST /api/expenses` - Create new expense
  - Body: `{ title, amount, category, date?, notes? }`
  - Headers: `Authorization: Bearer <token>`

- `GET /api/expenses` - Get all expenses
  - Query params: `category?`, `from?`, `to?`
  - Headers: `Authorization: Bearer <token>`

- `GET /api/expenses/:id` - Get expense by ID
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/expenses/:id` - Update expense
  - Body: `{ title?, amount?, category?, date?, notes? }`
  - Headers: `Authorization: Bearer <token>`

- `DELETE /api/expenses/:id` - Delete expense
  - Headers: `Authorization: Bearer <token>`

### Budget (Protected)

- `POST /api/budget` - Create or update monthly budget
  - Body: `{ amount }`
  - Headers: `Authorization: Bearer <token>`

- `GET /api/budget/current` - Get current month budget
  - Headers: `Authorization: Bearer <token>`

### Summary (Protected)

- `GET /api/summary/monthly` - Get monthly spending summary
  - Returns: `{ totalSpent, totalCount, categoryBreakdown }`
  - Headers: `Authorization: Bearer <token>`

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── expenseController.js # Expense CRUD operations
│   ├── budgetController.js  # Budget management
│   └── summaryController.js # Monthly summary with aggregation
├── middleware/
│   └── authMiddleware.js   # JWT authentication middleware
├── models/
│   ├── User.js            # User schema
│   ├── Expense.js         # Expense schema
│   └── Budget.js          # Budget schema
├── routes/
│   ├── auth.js            # Auth routes
│   ├── expenses.js        # Expense routes
│   ├── budget.js          # Budget routes
│   └── summary.js         # Summary routes
├── server.js              # Entry point
└── package.json
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- User-specific data access control
- Input validation
- Error handling

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

