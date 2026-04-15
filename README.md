# University Teachers' Union Portal (MERN)

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Navigation

Navbar now contains only:
- Home
- About
- Contact
- Login / Sign Out button on the right

## User Experience

All public content is available on the **Home** page:
- News
- Current Cabinet
- Previous Cabinets
- Struggles/Milestones
- Feedback form (email + feedback)

## Admin Experience

- Admin must login via `/admin-login`
- Admin panel at `/admin` is protected
- Admin can Add/Edit/Delete:
  - News
  - Current cabinet
  - Previous cabinets
  - Milestones
- Admin can view all user feedback

## Authentication

Backend authentication uses JWT and environment-defined admin credentials.

### Required server env

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/teachers_union
JWT_SECRET=change-me-secret
ADMIN_EMAIL=admin@union.edu
ADMIN_PASSWORD=admin123
```

## Setup

```bash
npm install
cp server/.env.example server/.env
npm run dev:server
npm run dev:client
```

Frontend: <http://localhost:5173>
Backend: <http://localhost:5000>
