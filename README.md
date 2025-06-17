# 🥗 SlimMom Health

**SlimMom Health** is a full-stack web application designed to help users maintain a healthy lifestyle by offering tools for tracking daily meals, calculating caloric intake, and receiving personalized nutrition suggestions.

🌐 **Live Demo**: [https://slimmom-health-goit-1.onrender.com/](https://slimmom-health-goit-1.onrender.com/)

---

## ✨ Features

- 🔐 **User Authentication** (Registration & Login)
- 📅 **Daily Food Diary** — log meals by day
- 🔢 **Calorie Calculator** — calculates daily caloric needs based on personal data
- 📊 **Summary Component** — shows remaining/consumed calories for the day
- 🍏 **Food Suggestions** — intelligent food search
- 🧭 Responsive UI with mobile, tablet, and desktop layouts

---

## 🧰 Tech Stack

### 🔹 Frontend

- **React 19** — component-based UI
- **React Router v7** — client-side routing
- **Redux Toolkit + Redux Thunk** — global state management
- **Redux Persist** — preserves state across reloads
- **Formik + Yup** — form handling & validation
- **React Datepicker** — intuitive date selection
- **Axios** — API communication
- **React Responsive** — media query-based component rendering

### 🔹 Backend (Node.js)

- **Express** — web framework for handling API routes
- **MongoDB + Mongoose** — NoSQL database for user and product data
- **JWT (jsonwebtoken)** — authentication via JSON Web Tokens
- **bcryptjs** — secure password hashing
- **Joi** — schema validation
- **SendGrid Mail** — email confirmation or notifications
- **Nanoid / UUID** — unique ID generation
- **Dotenv** — environment variable support
- **Morgan** — HTTP request logging
- **CORS** — cross-origin request handling

### 🔧 Build Tools

- **Vite** — fast development and production build tool
- **ESLint** — code quality and linting
- **SVGR** — SVGs as React components

### ☁️ Hosting

- **Render.com** — full-stack deployment of frontend and backend

---

## 📦 Scripts

### Frontend (`/frontend`)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview the production build
npm run lint       # Lint project with ESLint
```

### Backend (`/backend`)

```bash
node server.js     # Start server in production mode
npm run start:dev  # Start dev server with nodemon
npm run lint       # Run ESLint checks
npm run lint:fix   # Auto-fix lint issues
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MoiseFlori/slimmom-health-goit.git
cd slimmom-health
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `/backend`:

```env
PORT=your_port
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret
SENDGRID_API_KEY=your_api_key
```

### 5. Run development servers

#### In one terminal (backend)

```bash
cd backend
node server.js
```

#### In another terminal (frontend)

```bash
cd frontend
npm run dev
```

---



---

**Made with ❤️ by Flori**