# WeatherWise Events - Frontend (React)

## Introduction
This is the customer‑facing web UI for WeatherWise Events. It communicates with the FastAPI backend to fetch weather, score date suitability, list and create events, and generate recommendations.

## Prerequisites
- Node.js 18+
- npm

## Setup

### 1. Install dependencies
```
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and set:
- `REACT_APP_API_BASE_URL=http://localhost:8000` for development if the backend runs on port 8000.
- If omitted, the app will call same‑origin relative paths (e.g., `/api/...`). This is useful when using a reverse proxy.

See `events_frontend/.env.example` for details.

### 3. Start the dev server
```
npm start
```
The app will be available at http://localhost:3000

## Available Commands
- `npm start` — Start dev server
- `npm test` — Run tests
- `npm run build` — Production build

## Backend Coordination and CORS
- Default dev setup:
  - Backend: http://localhost:8000
  - Frontend: http://localhost:3000
- Set `REACT_APP_API_BASE_URL` in the frontend `.env` to point to the backend (e.g., `http://localhost:8000`).
- Ensure the backend `.env` sets `CORS_ALLOW_ORIGINS=http://localhost:3000` (or `*` for development).
- If deploying as same origin (reverse proxy), you can remove `REACT_APP_API_BASE_URL` and route `/api/*` to the backend.

## Troubleshooting “Failed to fetch” (TypeError)
A generic “Failed to fetch” often indicates either the backend is not reachable or CORS is blocking the browser request.
- Verify backend is running and reachable:
  - Open http://localhost:8000/ in your browser. You should see a health response.
- Confirm frontend is pointed at the right backend:
  - Check `.env` has `REACT_APP_API_BASE_URL=http://localhost:8000` (or your deployed URL). Restart `npm start` after changes.
- Fix CORS on the backend:
  - Set `CORS_ALLOW_ORIGINS=http://localhost:3000` in the backend `.env` for development (or `*`).
- Same‑origin deployments:
  - If using a reverse proxy to serve both apps from one origin, remove `REACT_APP_API_BASE_URL` and ensure the proxy forwards `/api/*` to the backend.

The frontend client now surfaces clearer diagnostics for network/CORS issues in error messages and console (enable `REACT_APP_API_DEBUG=true` during development).

## OpenAPI Reference
- Live docs from backend: http://localhost:8000/docs
- Schema JSON: http://localhost:8000/openapi.json
- A repository copy is at `events_backend/interfaces/openapi.json`.

## Post‑MVP Upgrade Notes
- Add analytics or error monitoring (Sentry, etc.) with proper environment variables (do not expose secrets).
- Add a reverse proxy configuration for production so the frontend and backend are served from a single origin.
- Harden CORS and content security policies for production.

## Customization
- Theme tokens and helpers live in `src/theme.js`; CSS variables are in `src/App.css`.
- Components are accessible, lightweight, and easy to adapt.
