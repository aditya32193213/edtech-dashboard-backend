# 🎓 LearnPro - Modern EdTech Learning Platform

> **LearnPro** is a full-stack Learning Management System (LMS) designed to bridge the gap between instructors and students. It features a robust course marketplace, secure payments, video streaming, and role-based dashboards for a seamless educational experience.

<p align="center"> <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" /> <img src="https://img.shields.io/badge/JWT-Authentication-blue" /> <img src="https://img.shields.io/badge/Stripe-Payments-purple?logo=stripe" /> <img src="https://img.shields.io/badge/Status-Production-success" /> </p>

# 

---

## ✨ Key Features

### 🔐 Authentication & Security
* **User Registration & Login**: Secure access for both Students and Instructors.
* **JWT Authentication**: Stateless authentication mechanism.
* **Role-Based Access Control (RBAC)**: Distinct permissions for Students vs. Instructors.
* **Secure Routes**: Middleware protection for private API endpoints.

### 👨‍🎓 For Students
* **Course Discovery:** Advanced search and filtering by category, level, and popularity.
* **Student Dashboard:** personalized learning path, progress tracking, and achievements.
* **Secure Enrollment:** Integrated Stripe payment gateway for seamless course purchasing.
* **Interactive Learning:** Video player with "Mark as Watched" progress tracking.
* **Dark Mode:** Fully responsive UI with a beautiful dark/light theme toggle.

### 👨‍🏫 For Instructors
* **Instructor Dashboard:** Real-time analytics on earnings, total students, and course performance.
* **Course Management:** Create, edit, and delete courses with ease.
* **Content Creation:** Add video lectures, thumbnails, and detailed descriptions.
* **Student Insights:** View enrollment data for specific courses.

### 🏗️ System Architecture
The application follows a standard MVC (Model-View-Controller) architectural pattern.
* **Frontend**: React.js acts as the client, consuming RESTful APIs.
* **Backend**: Node.js/Express handles business logic, authentication, and payment processing.
* **Database**: MongoDB stores user data, course content, and enrollment records.

---


A robust Node.js & Express backend responsible for:

-User authentication with JWT
-Role-based access control (Student / Instructor)
-Course creation & browsing
-Secure enrollment flow
-Stripe-based payment integration
-Course progress tracking
-RESTful APIs for frontend consumption

---

# 🌐 Live Demo & API

* 🔗 Frontend Demo: **https://edtech-dashboard-frontend.vercel.app/**
* 🔗 Backend API: **https://edtech-dashboard-backend.onrender.com/**
* 🔗 Swagger Docs: **https://edtech-dashboard-backend.onrender.com/api-docs/**


---

## 📸 Screenshots

| **Student Dashboard** | **Course Details** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/500x300?text=Student+Dashboard) | ![Course Page](https://via.placeholder.com/500x300?text=Course+Details) |

| **Instructor Dashboard** | **Add Course Page** |
|:---:|:---:|
| ![Instructor](https://via.placeholder.com/500x300?text=Instructor+Dashboard) | ![Add Course](https://via.placeholder.com/500x300?text=Create+Course) |

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

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM v6
* **State Management:** React Hooks (Context API)
* **HTTP Client:** Axios
* **Icons:** Heroicons / Lucide React
* **Notifications:** React Hot Toast

### **Backend (Server)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Payments:** Stripe API
* **Security:** Bcrypt.js, CORS

---

# 🗂️ Folder Structure
```plaintext
learnpro/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Route logic (Auth, Course, Enrollment)
│   ├── models/         # Mongoose Schemas (User, Course, Progress)
│   ├── routes/         # API Routes
│   └── middleware/     # Auth & Role middleware
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, Cards, Loaders)
│   │   ├── pages/      # Views (Dashboard, Login, CourseDetails)
│   │   ├── services/   # API calls (Axios instances)
│   │   └── utils/      # Helpers (Auth, Formatting)
│   └── public/         # Static assets
```
---

# 📡 API Documentation

## 🛣️ API Endpoints

### 🔐 Authentication

* POST /api/auth/register - Register a new user (Student/Instructor)
* POST /api/auth/login - Login user & return JWT

### 📚 Courses
* GET /api/courses - Fetch all courses (with filters)
* GET /api/courses/:id - Get single course details
* POST /api/courses - Create a new course (Instructor only)
* PUT /api/courses/:id - Update a course (Instructor only)
* DELETE /api/courses/:id - Delete a course (Instructor only)

### 🎓 Enrollment
* POST /api/enrollment/checkout - Create Stripe checkout session
* POST /api/enrollment/verify - Verify payment & enroll user
* GET /api/enrollment/my-enrollments - Get logged-in user's courses

### 💳 Payments
* POST /api/payments/checkout - Create Checkout Session
* POST /api/enrollments/after-payment - Enrollment After Payment

### 📈 Progress
* PATCH /api/progress/:courseId - Update Progress
-----

## 📘 Swagger

Interactive API documentation is available at:

🔗 **https://edtech-dashboard-backend.onrender.com/api-docs/**

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
---

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

---

### 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

----

# 🧑‍💻 Author

Aditya
Full Stack Developer
GitHub: aditya32193213

---

# ⭐ Support

If you like this project, please ⭐ star the repository.
Your support helps me grow as a developer ✨

----

# 📄 License
Distributed under the MIT License. See LICENSE for more information.


---

<p align="center"> Made with ❤️ by <a href="https://www.google.com/search?q=https://github.com/your-username">Aditya</a> </p>

