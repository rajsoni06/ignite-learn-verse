## **IgniteLearn (Modular Learning Platform)** 📚

**IgniteLearn** is a scalable, full-stack learning management system designed to deliver structured, interactive, and engaging educational content. The platform enables **admin users** to create and manage courses, while **learners** can explore learning paths, track progress, and complete interactive chapters.

Built with **Next.js**, **Node.js**, **Express**, and **MongoDB**, IgniteLearn features a modular course hierarchy (Courses → Sections → Units → Chapters) and supports various question types, including MCQs, fill-in-the-blanks, text-based, and audio-based answers. The system is designed with robust **JWT-based authentication**, **role-based access control**, and **real-time progress tracking**, offering a secure and personalized learning experience.

This platform is ideal for educational institutions, online academies, and professional training providers seeking to deliver impactful learning at scale. With its clean architecture and modern tech stack, IgniteLearn ensures performance, scalability, and a smooth user experience.

---

## 🚀 Features

### 👨‍🏫 **Admin Panel**

* JWT-based authentication and protected routes
* Role-based access (admin vs. learner)
* Admin dashboard to:

  * Create and manage courses
  * Add nested content: Sections → Units → Chapters
  * Design questions with types: MCQs, Fill-in-the-blanks, Text, and Audio-based (bonus)
  * Upload media (images/audio) as part of question content

### 📘 **Learner Dashboard**

* Register and login to access personalized dashboard
* View enrolled courses and resume progress
* Attempt chapter-level questions
* Auto-save progress at section, unit, and chapter level
* Score summary and chapter completion tracking

### 🧠 **Content Management**

* Deeply nested content structure using MongoDB population
* Secure API endpoints with input validation and error handling
* Question rendering engine with dynamic layouts per type

---

## 🧰 Tech Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | [Next.js](https://nextjs.org/), React, Tailwind CSS, Shadcn UI    |
| Backend    | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) |
| Database   | [MongoDB](https://www.mongodb.com/) with Mongoose ORM             |
| Auth       | JWT (JSON Web Tokens)                                             |
| State Mgmt | React Context or Redux (depending on implementation)              |

---

## 📁 Folder Structure

```
lovable-dev-learning-platform/
├── public/                      # Static assets
├── src/                         # Source files (components, pages, etc.)
├── backend/                     # Express API (optional if not integrated in Next.js)
├── components.json              # UI component definitions
├── vite.config.ts               # Vite config for frontend
├── tailwind.config.ts           # Tailwind setup
├── package.json                 # Project metadata and scripts
├── tsconfig*.json               # TypeScript configuration files
└── README.md                    # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/learning-platform.git
cd learning-platform
```

### 2. Install Dependencies

```bash
# Frontend
bun install
# or if you're using npm
npm install

# Backend (if in separate folder)
cd backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in both frontend and backend directories:

**Frontend `.env`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret
```

**Backend `.env`**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your_jwt_secret
```

### 4. Run the Project

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../
bun dev
# or
npm run dev
```

---

## 👥 User Roles

### 🔐 Admin

* Can create and edit course content
* Full access to course structure

### 📗 Learner

* Can browse, enroll, and attempt chapters
* Can track progress and view scores

---

## 🧪 Question Types Supported

* **MCQ** – Multiple choice with one correct answer
* **Fill in the Blank** – Text input based
* **Text Answer** – Paragraph responses
* **Audio Answer** – Optional feature to record or upload audio responses

---

## 📊 Goals and Focus

* **Modular Design**: Deeply nested course architecture (Course → Section → Unit → Chapter)
* **Role-based Access Control**
* **Conditional Rendering**: Display UI based on user type and question format
* **Progress Tracking**: Auto-save and resume from last activity
* **Security**: Input validation, token verification, and hashed passwords

---

## 📱 (Bonus) Mobile App (Optional)

* Built with Flutter (planned or optional)
* Allows learners to:

  * Login
  * View course hierarchy
  * Attempt chapters
  * Track and sync progress

---

## ✅ To-Do & Future Enhancements

* [ ] Add Flutter learner app
* [ ] Add media upload support in chapters
* [ ] Enable quiz review and re-attempt logic
* [ ] Add pagination for long lists of content
* [ ] Integrate caching and lazy loading

---

## 📝 Sample Credentials

| Role    | Email                                         | Password |
| ------- | --------------------------------------------- | -------- |
| Admin   | [admin@example.com](mailto:admin@example.com) | admin123 |
| Learner | [user@example.com](mailto:user@example.com)   | user123  |

> *(These are placeholder credentials. Replace with your own seed data.)*

---

## 🌐 Deployment

The project can be deployed to services like:

* **Frontend**: Vercel, Netlify
* **Backend**: Render, Railway, or Heroku
* **Database**: MongoDB Atlas (cloud-hosted MongoDB)

---

## 📩 Contact

Feel free to reach out for collaboration or questions:

**Author**: Raj Anand Soni
**Email**: \[[sonirajanand677@gmail.com](mailto:sonirajanand677@gmail.com)]
**LinkedIn**: https://www.linkedin.com/in/raj-anand-soni-037541212 
