# Tavern of Heroes

A full-stack community app built with the **MERN stack** — think of a small gaming forum where users (“heroes”) can sign up, log in, and share posts (“rumors”) in a tavern-themed UI.

**Live app:** [tavernofheroes.vercel.app](https://tavernofheroes.vercel.app)  
**API:** [mern-tavern-of-heroes.onrender.com](https://mern-tavern-of-heroes.onrender.com)

---

## What you can do

- **Auth** — register, log in, log out, delete account
- **Posts** — create, read, edit, and delete your own posts
- **Likes** — like / unlike posts
- **Users** — browse heroes, view public profiles
- **Account** — edit profile (nickname, hero class, gender, avatar)
- **Protected routes** — some pages require login (e.g. create post, account settings)

---

## Tech stack

| Layer | Tools |
|-------|--------|
| Frontend | React 19, React Router 7, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT stored in an **httpOnly cookie** (not in `localStorage`) |
| Validation | Zod (backend) |
| Testing | Vitest, React Testing Library |
| Deploy | Vercel (frontend), Render (backend) |

---

## How the app is organized (simple overview)

This project has two folders: `frontend/` and `backend/`. They talk to each other over HTTP.

### Backend (`backend/`)

Classic REST API:

- `POST /api/auth/register` — create account
- `POST /api/auth/login` — log in, server sets JWT cookie
- `GET /api/auth/me` — who is logged in?
- `POST /api/auth/logout` — clear cookie
- `GET/POST/PATCH/DELETE /api/posts` — posts CRUD + likes
- `GET/PATCH/DELETE /api/users` — user profiles

Passwords are hashed with **bcrypt**. Protected routes use middleware that reads the JWT from the cookie.

### Frontend (`frontend/`)

Built with **React Router 7** using a pattern you’ll see in modern React apps:

- **Loaders** — run *before* a page loads. They fetch data (e.g. list of posts) or check auth (redirect if not logged in).
- **Actions** — run when you submit a form (login, register, create post, etc.). They call the API and return success/errors to the UI.
- **Context** (`TavernContextProvider`) — holds the logged-in user in React state. It fetches the session **once on app load**, then updates after login, register, or logout — instead of re-checking auth on every route change.

Shared API helpers live in `frontend/src/api/` (e.g. `fetchMe`, `requireAuth`).

---

## Project structure

```
mern-tavern-of-heroes/
├── backend/
│   ├── api/routes/       # auth, posts, users
│   ├── middleware/       # JWT auth middleware
│   ├── models/           # User, Post (Mongoose schemas)
│   └── server.js         # entry point
│
└── frontend/
    ├── src/
    │   ├── api/          # shared fetch helpers
    │   ├── components/   # UI pieces (Navbar, Post, Pagination…)
    │   ├── context/      # global auth state
    │   ├── pages/        # route screens
    │   └── router/
    │       ├── loaders/  # data + route guards
    │       ├── actions/  # form submissions
    │       └── router.tsx
    └── vercel.json       # SPA routing on Vercel
```

---

## Run locally

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=3000
NODE_ENV=development
```

Start the server:

```bash
npm run server
```

API runs at `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start dev server:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## Useful commands (frontend)

| Command | What it does |
|---------|----------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest unit tests |

---

## What this project demonstrates

- Full-stack flow: React UI → Express API → MongoDB
- Real auth with cookies, protected routes, and session handling
- CRUD with ownership rules (users can only edit/delete their own posts)
- React Router loaders/actions instead of fetching everything inside components
- Unit tests for forms, loaders, navbar, and auth flows

---

## Author

**Radu Padurariu** — 2025–2026

All rights reserved.
