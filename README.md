🎓 College Portal - MERN Stack
A complete College Management System built with MERN Stack (MongoDB, Express.js, React.js, Node.js) with role-based authentication for Students, Faculty, and Admin.

📋 Table of Contents
Features

Tech Stack

System Architecture

Installation

Environment Variables

Running the Application

API Endpoints

Folder Structure

Contributing

License

✨ Features
👨‍🎓 Student Panel
Register/Login with secure authentication

View personal profile

Check attendance

View marks/results

Download study materials

Submit assignments

View timetable

Fee status

👨‍🏫 Faculty Panel
Register/Login (Admin approval required)

Mark attendance

Upload study materials

Create/view assignments

Enter marks

View class schedule

Student list

👨‍💼 Admin Panel
Full control over system

Approve faculty registrations

Manage students & faculty

Create/update courses

Generate reports

Manage departments

System settings

🔐 Common Features
JWT Authentication

Role-based access control

Protected routes

Responsive design

RESTful API

MongoDB database

🛠️ Tech Stack
Frontend
⚛️ React.js (Vite)

🎨 Tailwind CSS / CSS3

🧭 React Router DOM

🔐 Axios for API calls

📦 Context API (State Management)

🎯 React Hot Toast (Notifications)

Backend
🟢 Node.js

🚀 Express.js

🍃 MongoDB with Mongoose

🔑 JWT (JSON Web Tokens)

🔒 Bcrypt.js (Password encryption)

📁 Multer (File uploads)

🌐 CORS

DevOps & Tools
📦 Git & GitHub

🧪 Thunder-client (API testing)

🖥️ VS Code

🏗️ System Architecture
text
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Express   │────▶│   MongoDB   │
│   Frontend  │◀────│   Backend   │◀────│   Database  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
   Components          API Routes            Collections
   Context             Controllers           Users
   Hooks               Middleware            Courses
   Pages               Models                Attendance
