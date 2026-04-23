# Abu Turab Hassan — Portfolio

A modern, animated portfolio website built with React, Three.js, GSAP, and Framer Motion.

---

## 🚀 Tech Stack

### Frontend
- **React 18** + Vite
- **Three.js** — 3D particle sphere in the Hero section
- **GSAP** — Text animations and scroll-triggered effects
- **Framer Motion** — Page transitions, section animations, micro-interactions
- **Fonts**: Cormorant Garamond, Syne, DM Mono

### Backend
- **Node.js** + Express
- **Nodemailer** — Sends emails via Gmail
- **Rate limiting** — 5 form submissions per 15 min per IP

---

## 📁 Project Structure

```
portfolio/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── sections/  # Hero, About, Skills, Experience, Projects, Contact
│   │   ├── components/# Navbar, Footer, Cursor, LoadingScreen
│   │   └── App.jsx
│   └── package.json
└── backend/           # Express API
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Setup & Running

### 1. Clone / Extract the project

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your Gmail App Password:

```env
GMAIL_USER=abuturabhassankhan@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**How to get a Gmail App Password:**
1. Go to [myaccount.google.com](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Search for **App passwords** in your Google Account
4. Create a new App Password for **Mail**
5. Copy the 16-character password into `.env`

Start the backend:
```bash
npm run dev   # development (with nodemon)
# or
npm start     # production
```

The backend runs on **http://localhost:5000**

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

The Vite dev server proxies `/api` calls to `http://localhost:5000` automatically.

---

## 🌐 Production Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build   # Creates /dist folder
```
Deploy the `/dist` folder. Set the API URL env var if needed.

### Backend (Railway / Render / VPS)
```bash
cd backend
npm start
```
Set environment variables in your hosting dashboard:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`  
- `FRONTEND_URL` (your deployed frontend URL)
- `PORT` (usually auto-set by host)

### Update Vite proxy for production
In `frontend/vite.config.js`, the proxy is for development only.
For production, update the axios base URL in `Contact.jsx`:
```js
await axios.post('https://your-backend.railway.app/api/contact', form)
```

---

## 📧 How Email Works

When someone submits the contact form:
1. **You receive** a styled HTML email at `abuturabhassankhan@gmail.com` with the sender's details and message
2. **The sender receives** an auto-reply thanking them and setting expectations

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` |
| Accent (Gold) | `#c8a96e` |
| Text Primary | `#f0ede8` |
| Font Display | Cormorant Garamond |
| Font UI | Syne |
| Font Mono | DM Mono |

---

## ✨ Features

- Custom animated cursor (desktop)
- Loading screen with progress bar
- Three.js interactive particle sphere (mouse-reactive)
- GSAP text animations on Hero
- Framer Motion scroll-based section reveals
- Animated skill bars
- Timeline-style experience section
- Expandable project cards
- Working contact form with email delivery
- Auto-reply to senders
- Rate limiting on contact endpoint
- Fully responsive (mobile-first)
- Noise texture overlay for depth

---

Made with ♥ by Abu Turab Hassan
