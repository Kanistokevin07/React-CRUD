# Employee Management System (EMS)

## Overview

The Employee Management System (EMS) is a full-stack web application designed to manage employees using role-based access control (RBAC). It supports authentication, authorization, and CRUD operations for users with different privilege levels such as Admin, Manager, and Employee.

The system is built using the MERN stack:

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

---

## Features

### Authentication
- User registration with hashed password storage
- Secure login using JWT authentication
- Protected routes using middleware

### Role-Based Access Control (RBAC)
- Employee: Access and update own profile, change password
- Manager: View employees, update salary and status
- Admin: Full access including user deletion and role management

### User Management
- Create users (registration)
- View users based on role permissions
- Update profile information
- Update salary and status (authorized roles only)
- Delete users (admin only)

---

## System Workflow

### Authentication Flow

1. User registers an account
2. User logs in with email and password
3. Server validates credentials
4. JWT token is generated and returned
5. Token is stored in frontend local storage
6. Token is sent in Authorization header for protected routes

---

### Authorization Flow

1. Client sends request with JWT token
2. Middleware verifies token
3. User role is extracted from token
4. Role-based access control determines permission
5. Request is either allowed or rejected

---

## Role Permissions

| Role     | Permissions |
|----------|-------------|
| Employee | View and update own profile, change password |
| Manager  | View employees, update salary and status |
| Admin    | Full system access including delete and role update |

---

## Tech Stack

### Frontend
- React
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

---

## Project Structure

### Backend

backend/
│── models/
│   └── User.js
│
│── controllers/
│   ├── authController.js
│   └── userController.js
│
│── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
│── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
│── config/
│   └── db.js
│
│── server.js


##frontend

frontend/
│── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   └── App.jsx




## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- npm

---

## Backend Setup

cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
JWT_SECRET=your_secret_key

npm start
(or)
nodemon server.js

frontend setup:

cd frontend
npm install

npm install axios react-router-dom
npm install tailwindcss postcss autoprefixer
npm install lucide-react
npm install framer-motion

npm run dev


