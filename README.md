# ⚙️ EdTech Dashboard Backend

_The backend engine powering authentication, course management, enrollments, payments, and progress tracking for the EdTech Dashboard platform._

<p align="center"> <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" /> <img src="https://img.shields.io/badge/JWT-Authentication-blue" /> <img src="https://img.shields.io/badge/Stripe-Payments-purple?logo=stripe" /> <img src="https://img.shields.io/badge/Status-Production-success" /> </p>

A robust Node.js & Express backend responsible for:

-User authentication with JWT
-Role-based access control (Student / Instructor)
-Course creation & browsing
-Secure enrollment flow
-Stripe-based payment integration
-Course progress tracking
-RESTful APIs for frontend consumption

---

# 🌐 Live Backend API
🔗 **https://edtech-dashboard-backend.onrender.com/**

---

# ✨ Features
### 🔐 1. Authentication & Authorization

-User registration & login
-JWT-based authentication
-Role-based access control (RBAC)
-Secure protected routes

---

### 📚 2. Course Management

-Instructor-only course creation
-Public course listing
-Fetch single course details
-Instructor details populated automatically

---

### 🎓 3. Enrollment System

-Students can enroll in courses
-Duplicate enrollment prevention
-Enrollment linked to user & course
-Enrollment history fetch per user

---

### 💳 4. Payment Integration (Stripe)

-Secure checkout session creation
-Payment-based enrollment confirmation
-Mock + real payment flow supported

---

### 📈 5. Progress Tracking

-Track course completion percentage
-Update progress dynamically
-Progress linked per user & course
-Last access timestamp maintained

---

### 🔌 6. RESTful API Design

Clean, predictable APIs designed for scalability and frontend integration.

---

# 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** |	Node.js|
| **Framework** | Express.js |
| **Database**	| MongoDB + Mongoose |
| ***Authentication*** | JWT |
| **Payments** | Stripe |
| **Security** | bcrypt, CORS|
| **Deployment** | Render |

---

# 🗂️ Folder Structure
```plaintext
backend/
│── controllers/
│   ├── authController.js
│   ├── courseController.js
│   ├── enrollmentController.js
│   ├── paymentController.js
│   ├── progressController.js
│
│── models/
│   ├── User.js
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Progress.js
│
│── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── enrollmentRoutes.js
│   ├── paymentRoutes.js
│   ├── progressRoutes.js
│
│── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│
│── server.js
│── package.json
│── .env.example
│── .gitignore
```
---

# 📡 API Documentation

## 📘 Swagger

Interactive API documentation is available at:

🔗 **http://localhost:10000/api-docs**

---

## 🔐 Authentication

### ***Register User***

`POST /api/auth/register`

### **Request**
```json
{
  "name": "Student One",
  "email": "student@test.com",
  "password": "123456",
  "role": "student"
}
```

### Login User

`POST /api/auth/login`

### **Response**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "...",
    "name": "Student One",
    "email": "student@test.com",
    "role": "student"
  }
}
```

### 📚 Courses
### ***Create Course (Instructor Only)***

`POST /api/courses`

Headers

Authorization: Bearer <token>


### **Request**
```json
{
  "title": "React for Beginners",
  "description": "Learn React from scratch",
  "price": 1999,
  "category": "Web Development",
  "duration": "6 hours",
  "level": "Beginner",
  "videoUrl": "https://youtube.com/..."
}
```

### ***Get All Courses***

`GET /api/courses`

### ***Get Single Course***

`GET /api/courses/:courseId`

### 🎓 Enrollment

### ***Enroll in Course***

`POST /api/enroll/:courseId`

Headers

Authorization: Bearer <token>

### ***Get My Enrollments***

`GET /api/enrollments`

### 💳 Payments
 
### ***Create Checkout Session***

`POST /api/payments/checkout`

### **Request**
```json
{
  "courseId": "COURSE_ID",
  "title": "React for Beginners",
  "price": 1999
}
```

### ***Enrollment After Payment***

`POST /api/enrollments/after-payment`

### **Request**
```json
{
  "courseId": "COURSE_ID"
}
```

### 📈 Progress

### ***Update Progress***

`PATCH /api/progress/:courseId`

### **Request**
```json
{
  "completedPercentage": 50
}
```
---

# 🏗️ System Architecture Diagram
```plaintext
                ┌──────────────────────────────┐
                │     Frontend (React.js)      │
                │ Auth | Courses | Dashboard   │
                └───────────────┬──────────────┘
                                │
                                ▼
                  ┌───────────────────────────┐
                  │  Backend (Node + Express) │
                  │ Auth | Courses | Payments │
                  └───────────────┬───────────┘
                                │
                                ▼
                     ┌─────────────────────────┐
                     │      MongoDB Atlas      │
                     │ Users | Courses | Logs  │
                     └─────────────────────────┘
```

# ⚙️ Installation & Setup
## 🔽 Clone Repository
```bash
git clone https://github.com/aditya32193213/edtech-dashboard-backend.git
cd edtech-dashboard-backend
```

### 📦 Install Dependencies
```bash
npm install
```

### 🔐 Environment Variables

Create .env file:

```bash
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_URL=http://localhost:3000
```

### ▶️ Run Server
### Development:
```bash
npm run dev
```

### Production
```bash
npm start
```

# 🧑‍💻 Author

Aditya
Full Stack Developer
GitHub: https://github.com/aditya32193213

# ⭐ Support

If you like this project, please ⭐ star the repository.
Your support helps me grow as a developer ✨
