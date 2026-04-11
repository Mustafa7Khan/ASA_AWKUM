# University Teachers' Union Portal (MERN)

This project uses the requested stack:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

## Project Structure

- `client/` → React (Vite) app with Tailwind styling
- `server/` → Express API + MongoDB models/routes

## Features Implemented

- News section
- Current cabinet with designation, department, and photos
- Previous cabinets archive
- History of struggle timeline
- API-backed content (`GET /api/content`, `PUT /api/content`)
- Fallback seed data when DB has no records yet

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp server/.env.example server/.env
```

3. Ensure MongoDB is running locally (or update `MONGO_URI` in `.env`).

4. Run backend:

```bash
npm run dev:server
```

5. In a separate terminal, run frontend:

```bash
npm run dev:client
```

Frontend: <http://localhost:5173>
Backend: <http://localhost:5000>

## Notes

- `client` proxies `/api` calls to `http://localhost:5000`.
- Tailwind is configured in `client/tailwind.config.js` and `client/postcss.config.js`.
- To update content programmatically, send a `PUT` request to `/api/content` with the same shape as seed data.
