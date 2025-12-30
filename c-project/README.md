# Expense Tracking System

A full-stack expense tracking application with React frontend and Node.js backend.

## Project Structure

```
c-project/
├── frontend/          # React.js frontend application
│   ├── src/          # Source code
│   ├── package.json  # Frontend dependencies
│   └── ...
├── backend/          # Node.js/Express backend API
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Entry point
│   └── ...
└── README.md         # This file
```

## Getting Started

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=3000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

## Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Axios
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt

## Features

- User authentication (Signup/Login)
- Expense management (CRUD operations)
- Budget tracking and management
- Monthly spending summary
- Category-based filtering
- Data visualization with charts

