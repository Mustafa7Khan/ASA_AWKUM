# University Teachers' Union Portal (MERN)

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
npm run dev:client
```

Frontend: <http://localhost:5173>
Backend: <http://localhost:5000>
