# Jobby App 💼

A full-featured job search application built with React.js that allows users to search and filter jobs based on employment type, salary range, and location.

## 🔗 Live Demo

👉 [https://jobby-app-zu3n.vercel.app](https://jobby-app-zu3n.vercel.app)

## 📌 GitHub Repository

👉 [https://github.com/goulipsharathkumar/jobby-app](https://github.com/goulipsharathkumar/jobby-app)

---

## 📸 Screenshots

| Login | Home | Jobs |
|-------|------|------|
| Login with credentials | Find jobs button | Filter and search jobs |

---

## 🚀 Features

- **Login / Authentication** — JWT token based login with error handling
- **Protected Routes** — Unauthenticated users are redirected to login
- **Home Route** — Landing page with navigation to Jobs
- **Jobs Route** — Search and filter jobs by:
  - Employment Type (Full Time, Part Time, Freelance, Internship)
  - Salary Range (10 LPA, 20 LPA, 30 LPA, 40 LPA and above)
  - Location (Hyderabad, Bangalore, Chennai, Delhi, Mumbai)
- **Job Details Route** — View full job details, skills, life at company, and similar jobs
- **Sticky Header** — Header stays visible while scrolling
- **Sticky Sidebar** — Filters stay visible while browsing jobs
- **Failure Views** — Retry option when API calls fail
- **No Jobs View** — Friendly message when no jobs match filters
- **Not Found Route** — 404 page for invalid URLs
- **Logout** — Clears session and redirects to login

---

## 🛠️ Tech Stack

- **React.js** — Frontend library
- **React Router DOM** — Client-side routing
- **JS Cookie** — JWT token management
- **React Icons** — Icon library
- **React Loader Spinner** — Loading animations
- **CSS** — Custom styling with responsive design

---

## 📁 Project Structure

```
src/
├── App.js
├── App.css
└── components/
    ├── Login/
    ├── Header/
    ├── Home/
    ├── Jobs/
    ├── JobCard/
    ├── JobItemDetails/
    ├── SimilarJobItem/
    ├── NotFound/
    └── ProtectedRoute/
```

---

## 🔐 User Credentials

```
Username: rahul
Password: rahul@2021
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/goulipsharathkumar/jobby-app.git
   cd jobby-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📡 API Endpoints

| API | Method | Description |
|-----|--------|-------------|
| `https://apis.ccbp.in/login` | POST | Login and get JWT token |
| `https://apis.ccbp.in/profile` | GET | Get user profile details |
| `https://apis.ccbp.in/jobs` | GET | Get list of jobs with filters |
| `https://apis.ccbp.in/jobs/:id` | GET | Get job details by ID |

---

## 🌐 Deployment

This project is deployed on **Vercel**.

👉 Live URL: [https://jobby-app-zu3n.vercel.app](https://jobby-app-zu3n.vercel.app)

---

## 👨‍💻 Developer

**Goulip Sharath Kumar**

- GitHub: [@goulipsharathkumar](https://github.com/goulipsharathkumar)

---

## 📄 License

This project is for educational purposes as part of the NxtWave CCBP 4.0 program.
