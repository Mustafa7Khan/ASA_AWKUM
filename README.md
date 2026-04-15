# University Teachers' Union Portal (MERN)

# codex/build-website-for-teacher-union-2jtxy5
## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## User Functionalities

- See Current Cabinet
- See Previous Cabinets
- See News
- See Struggles/Milestones
- Give feedback (email + feedback text)
- Navigate dedicated pages: About, Contact, Struggles, News, Cabinets

## Admin Functionalities

- Add/Edit/Delete current cabinet members
- Add/Edit/Delete previous cabinets
- Add/Edit/Delete news
- Add/Edit/Delete milestones
- See all feedback submitted by users

## API Endpoints

- `GET/POST/PUT/DELETE /api/news`
- `GET/POST/PUT/DELETE /api/current-cabinet`
- `GET/POST/PUT/DELETE /api/previous-cabinets`
- `GET/POST/PUT/DELETE /api/milestones`
- `GET/POST /api/feedback`
- `GET /api/public/overview`

## Setup

```bash
npm install
cp server/.env.example server/.env
npm run dev:server

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
 main
npm run dev:client
```

Frontend: <http://localhost:5173>
Backend: <http://localhost:5000>
# codex/build-website-for-teacher-union-2jtxy5


## Notes

- `client` proxies `/api` calls to `http://localhost:5000`.
- Tailwind is configured in `client/tailwind.config.js` and `client/postcss.config.js`.
- To update content programmatically, send a `PUT` request to `/api/content` with the same shape as seed data.
main
