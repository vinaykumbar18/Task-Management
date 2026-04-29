# Task-Management

**Setup Steps**
**1. Clone Project**
git clone Tash Management
cd Task Management

**2. Backend Setup**
npm install

Install dependencies:

npm install express pg bcrypt jsonwebtoken cors dotenv

Run backend:

node app.js

Server runs on:

http://localhost:5000

**3. Frontend Setup**

Move to frontend folder:
cd views

Install packages:

npm install
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173

**4. Database Setup**

**Create PostgreSQL database and run:**

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    status VARCHAR(20) DEFAULT 'Pending',
    user_id INTEGER REFERENCES users(id)
);

**Tech Stack Used**
**Frontend**
React.js
Vite
Tailwind CSS
Axios
React Router DOM

**Backend**
Node.js
Express.js
JWT Authentication
bcrypt (Password Hashing)
Database
PostgreSQL

**Features Implemented**
**Authentication System**
User Signup
User Login
Password hashing using bcrypt
JWT token generation
Protected routes using middleware
Logout functionality

**Task Management (Multi-User)**
Create new tasks
View only logged-in user's tasks
Update task status (Pending → Completed)
Delete tasks
Secure user-task relationship

**Backend Features**
MVC folder structure
Controllers, Routes, Config separation
Error handling
REST API integration
Middleware authentication

**Frontend Features**
Clean responsive UI
Login / Signup pages
Dashboard page

**Project Structure**
Task Management/
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── app.js
│
│── views/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js
