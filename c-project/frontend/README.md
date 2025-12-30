# Expense Tracking System - Frontend

A React.js frontend application for tracking expenses with authentication, budget management, and expense tracking features.

## Tech Stack

- React.js 18 (Functional Components + Hooks)
- React Router DOM v6
- Axios for API calls
- Tailwind CSS for styling
- Recharts for data visualization

## Features

- **Authentication**: Signup and Login with JWT token management
- **Dashboard**: Overview of monthly spending and budget
- **Expense Management**: Add, edit, delete, and filter expenses
- **Budget Management**: Set and track monthly budget with visualizations
- **Protected Routes**: Secure access to authenticated pages

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (optional):
```
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/
  │   └── Layout.jsx          # Navigation layout component
  ├── pages/
  │   ├── Login.jsx           # Login page
  │   ├── Signup.jsx          # Signup page
  │   ├── Dashboard.jsx       # Dashboard page
  │   ├── ExpenseList.jsx     # Expense list with filters
  │   ├── ExpenseForm.jsx     # Add/Edit expense form
  │   └── Budget.jsx          # Budget management page
  ├── routes/
  │   └── ProtectedRoute.jsx  # Route protection component
  ├── services/
  │   └── api.js             # Axios API service with interceptors
  ├── App.jsx                # Main app component with routing
  ├── main.jsx               # Entry point
  └── index.css              # Tailwind CSS imports
```

## API Endpoints

The application expects the following backend API endpoints:

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /expenses` - Get all expenses (with optional query params: category, from, to)
- `GET /expenses/:id` - Get expense by ID
- `POST /expenses` - Create new expense
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense
- `GET /summary/monthly` - Get monthly spending summary
- `GET /budget/current` - Get current budget
- `POST /budget` - Create or update budget

## Build

To build for production:
```bash
npm run build
```

The build output will be in the `dist` directory.

