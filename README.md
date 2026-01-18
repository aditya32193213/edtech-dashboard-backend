# 🎓 LearnPro - Modern EdTech Learning Platform

> **LearnPro** is a full-stack Learning Management System (LMS) designed to bridge the gap between instructors and students. It features a robust course marketplace, secure payments, video streaming, role-based dashboards, and an AI-powered Learning Assistant for a smarter educational experience.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-blue" />
  <img src="https://img.shields.io/badge/Stripe-Payments-purple?logo=stripe" />
  <img src="https://img.shields.io/badge/Gemini-AI%20Assistant-orange" />
  <img src="https://img.shields.io/badge/Sentry-Monitoring-362D59?logo=sentry" />
  <img src="https://img.shields.io/badge/Status-Production-success" />
</p>

---

## 🌐 Live Demo & API

* 🔗 **Frontend Demo:** [https://edtech-dashboard-frontend.vercel.app/](https://edtech-dashboard-frontend.vercel.app/)
* 🔗 **Backend API:** [https://edtech-dashboard-backend.onrender.com/](https://edtech-dashboard-backend.onrender.com/)
* 📚 **Swagger Docs:** [https://edtech-dashboard-backend.onrender.com/api-docs/](https://edtech-dashboard-backend.onrender.com/api-docs/)

---

## ✨ Key Features

### 🔐 Authentication & Security
* ✅ **User Registration & Login**: Secure access for both Students and Instructors
* 🔑 **JWT Authentication**: Stateless authentication mechanism
* 🛡️ **Role-Based Access Control (RBAC)**: Distinct permissions for Students vs. Instructors
* 🔒 **Secure Routes**: Middleware protection for private API endpoints
* 🌐 **Environment-Based Configuration**: Secure `.env` management

### 👨‍🎓 For Students
* 🔍 **Course Discovery**: Advanced search and filtering by category, level, and popularity
* 📊 **Student Dashboard**: Personalized learning path, progress tracking, and achievements
* 💳 **Secure Enrollment**: Integrated Stripe payment gateway for seamless course purchasing
* 🎥 **Interactive Learning**: Video player with "Mark as Watched" progress tracking
* 🌓 **Dark Mode**: Fully responsive UI with beautiful dark/light theme toggle
* 🤖 **AI Learning Assistant**: 
  - Ask learning-related questions in natural language
  - Get personalized course recommendations
  - Receive guidance on next skills to learn
  - AI-driven career insights powered by Google Gemini API

### 👨‍🏫 For Instructors
* 📈 **Instructor Dashboard**: Real-time analytics on earnings, total students, and course performance
* 📝 **Course Management**: Create, edit, and delete courses with ease
* 🎬 **Content Creation**: Add video lectures, thumbnails, and detailed descriptions
* 👥 **Student Insights**: View enrollment data for specific courses

### 🤖 AI-Powered Learning Assistant (Gemini Integration)

The platform includes an intelligent chatbot built using **Google Gemini API**, acting as a virtual learning assistant.

**🌟 Key Capabilities:**
- 💬 Conversational Q&A for learners
- 🎯 Personalized recommendations:
  - "Next course to take"
  - "Skills to focus on"
  - Suggested learning paths based on user queries
- 🧠 Context-aware responses using user-provided learning context
- ⚡ Real-time responses with graceful error handling

**🔧 Technical Details:**
- 🤖 **Model Used**: `gemini-2.5-flash`
- 🔌 **Integration Method**: REST API (server-side)
- 🔐 **Security**: API key stored securely in backend environment variables
- 📡 **Endpoint**: `POST /api/chat` or `POST /api/ai/chat`

### 🛡️ Monitoring & Error Tracking
* 📊 **Sentry Integration**: Backend error tracking and monitoring
* 🐛 **Stack Traces**: File and line number debugging
* 🚨 **Production Issue Detection**: Real-time crash reporting
* 🔍 **Debug Endpoint**: `/debug-sentry` for testing error logging

### ☁️ Cloud Infrastructure
* 🚀 **Deployed on Render**: Auto-deploy from GitHub
* 🌍 **MongoDB Atlas**: Scalable cloud database
* 🔄 **CI/CD Pipeline**: Automatic deployments
* 🔐 **Secure Environment Variables**: Production-grade configuration

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* ⚛️ **Framework:** React.js (Vite)
* 🎨 **Styling:** Tailwind CSS
* 🛣️ **Routing:** React Router DOM v6
* 🔄 **State Management:** React Hooks (Context API)
* 📡 **HTTP Client:** Axios
* 🎭 **Icons:** Heroicons / Lucide React
* 🔔 **Notifications:** React Hot Toast

### **Backend (Server)**
* 🟢 **Runtime:** Node.js 18
* 🚂 **Framework:** Express.js
* 🍃 **Database:** MongoDB & Mongoose
* 🔑 **Authentication:** JWT (JSON Web Tokens)
* 📡 **HTTP Client:** Axios
* 💳 **Payments:** Stripe API
* 🔒 **Security:** Bcrypt.js, CORS
* 🤖 **AI Assistant:** Google Gemini API
* 📦 **Environment:** dotenv
* 🛡️ **Monitoring:** Sentry

### **DevOps & Deployment**
* ☁️ **Frontend Hosting:** Vercel
* ☁️ **Backend Hosting:** Render
* 🗄️ **Database:** MongoDB Atlas
* 📚 **API Docs:** Swagger/OpenAPI

---

## 🗂️ Folder Structure

```plaintext
learnpro/
├── backend/
│   ├── config/         # DB connection & environment setup
│   ├── controllers/    # Route logic (Auth, Course, Enrollment, Chat)
│   │   └── chat.controller.js
│   ├── models/         # Mongoose Schemas (User, Course, Progress)
│   │   └── Course.js
│   ├── routes/         # API Routes
│   │   ├── chat.routes.js
│   │   └── course.routes.js
│   ├── middleware/     # Auth & Role middleware
│   ├── instrument.js   # Sentry initialization
│   ├── server.js       # App entry point
│   └── .env           # Environment variables
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

## 🔌 API Documentation

### 🤖 AI Assistant

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/chat` or `/api/ai/chat` | Chat with Gemini AI learning assistant | ✅ |

**Request Body:**
```json
{
  "message": "Suggest my next course"
}
```

**Response:**
```json
{
  "reply": "Based on your progress, I recommend..."
}
```

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user (Student/Instructor) |
| `POST` | `/api/auth/login` | Login user & return JWT |

### 📚 Courses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/courses` | Fetch all courses (with filters) | ❌ |
| `GET` | `/api/courses/:id` | Get single course details | ❌ |
| `POST` | `/api/courses` | Create a new course | ✅ Instructor |
| `PUT` | `/api/courses/:id` | Update a course | ✅ Instructor |
| `DELETE` | `/api/courses/:id` | Delete a course | ✅ Instructor |

### 🎓 Enrollment

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/enrollment/checkout` | Create Stripe checkout session | ✅ |
| `POST` | `/api/enrollment/verify` | Verify payment & enroll user | ✅ |
| `GET` | `/api/enrollment/my-enrollments` | Get logged-in user's courses | ✅ |

### 💳 Payments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/payments/checkout` | Create Checkout Session | ✅ |
| `POST` | `/api/enrollments/after-payment` | Enrollment After Payment | ✅ |

### 📈 Progress

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `PATCH` | `/api/progress/:courseId` | Update course progress | ✅ |

### 🛡️ Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/debug-sentry` | Test Sentry error logging |

---

## 📘 Interactive API Documentation

Full interactive API documentation is available via Swagger:

🔗 **[https://edtech-dashboard-backend.onrender.com/api-docs/](https://edtech-dashboard-backend.onrender.com/api-docs/)**

---

## 🗃️ System Architecture

```plaintext
                ┌──────────────────────────────┐
                │   Frontend (React.js)        │
                │   Auth | Courses | Dashboard │
                │   AI Chat | Dark Mode        │
                └──────────────┬───────────────┘
                               │
                               ▼
                  ┌────────────────────────────┐
                  │ Backend (Node + Express)   │
                  │ Auth | Courses | Payments  │
                  │ AI Chat (Gemini) | Sentry  │
                  └──────────────┬─────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
       ┌─────────────┐  ┌──────────────┐  ┌─────────────┐
       │  MongoDB     │  │ Stripe API   │  │ Gemini API  │
       │  Atlas       │  │ (Payments)   │  │ (AI Chat)   │
       │ Users|Course │  └──────────────┘  └─────────────┘
       └─────────────┘
                │
                ▼
       ┌─────────────┐
       │   Sentry    │
       │ (Monitoring)│
       └─────────────┘
```

---

## ⚙️ Installation & Setup

### 📥 Clone Repository

```bash
git clone https://github.com/aditya32193213/edtech-dashboard-backend.git
cd edtech-dashboard-backend
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=10000

# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Payment Gateway
STRIPE_SECRET_KEY=your_stripe_secret_key

# AI Assistant
GEMINI_API_KEY=your_google_gemini_api_key

# Frontend URL
CLIENT_URL=http://localhost:3000

# Monitoring
SENTRY_DSN=your_backend_sentry_dsn
```

### ▶️ Run Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

🌍 Server runs on: `http://localhost:10000`

---

## 🧪 Testing

### 🔧 Test with Postman

1. **AI Chat Endpoint**
   ```
   POST http://localhost:10000/api/chat
   Body: { "message": "What should I learn next?" }
   ```

2. **Sentry Error Logging**
   ```
   GET http://localhost:10000/debug-sentry
   ```

3. **Course Listing**
   ```
   GET http://localhost:10000/api/courses
   ```

---

## 📊 Monitoring & Performance

### 🛡️ Sentry Integration

LearnPro uses **Sentry** for comprehensive error tracking:

- 🐛 **Runtime Crash Detection**: Captures unhandled exceptions
- 📍 **Stack Traces**: File and line number debugging
- 🚨 **Real-time Alerts**: Instant notifications for production issues
- 📈 **Performance Monitoring**: Track API response times
- 🔍 **Debug Endpoint**: `/debug-sentry` for testing

### ✅ Production-Ready Features

- ✔️ Cloud deployed on Render
- ✔️ Auto-deploy from GitHub
- ✔️ Environment-based configuration
- ✔️ Centralized error handling
- ✔️ MongoDB Atlas persistence
- ✔️ Secure API endpoints
- ✔️ Performance optimized
- ✔️ Portfolio-grade quality

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the Branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

---

## 🧑‍💻 Author

**Aditya**  
🚀 Full Stack Developer | Cloud & AI Systems  
🔗 GitHub: [@aditya32193213](https://github.com/aditya32193213)

---

## ⭐ Support

If you like this project, please ⭐ **star the repository**.  
Your support helps me grow as a developer ✨

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

* 🤖 Google Gemini API for AI capabilities
* 💳 Stripe for secure payment processing
* 🛡️ Sentry for error monitoring
* ☁️ Render & Vercel for hosting
* 🍃 MongoDB Atlas for database
* 💎 React & Tailwind CSS communities

---

<p align="center">
  <strong>Made with ❤️ by <a href="https://github.com/aditya32193213">Aditya</a></strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Portfolio-Ready-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Production-Live-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Open%20Source-❤️-red?style=for-the-badge" />
</p>