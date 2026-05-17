# EESTEC Voting UI

React frontend for the EESTEC LC Thessaloniki voting and general meeting management system.

## Prerequisites

- Node.js 18+
- The Spring Boot backend running at `http://localhost:8080`

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Tech Stack

| | |
|---|---|
| Build | Vite 7 |
| UI | React 19 |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| HTTP | Axios |

## Project Structure

```
src/
  assets/            Static files (logo, icons)
  components/
    layout/          Shell components: Layout, Sidebar, TopBar, MainPanel
    ui/              Reusable atoms: Card, Icon, SearchBar, BreadCrumb
  features/
    dashboard/
      comps/         Dashboard and attendance components
      data/          Mock data (partially still in use)
  hooks/             TanStack Query wrappers (usePolls, useEvents, etc.)
  pages/             One file per route
  router/            AppRouter, ProtectedRoute, routes constants
  services/          API modules + Zustand auth store
  styles/            Global CSS, variables
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Authentication

Login at `/login`. The JWT is stored in `localStorage` and attached to every API request via an Axios interceptor. A 401 response automatically clears the session and redirects to `/login`.

User roles: `USER`, `MODERATOR`, `ADMIN`. Privileged actions (creating meetings, managing polls) require `MODERATOR` or `ADMIN`.

## Pages

| Route | Page | Access |
|---|---|---|
| `/` | Dashboard | All |
| `/attendance` | Attendance check-in / history | All |
| `/meetings` | General meetings list | All (create: Moderator+) |
| `/polls` | Polls | All |
| `/events` | Events | All |
| `/announcements` | Announcements | All |
| `/members` | Members | All |
| `/reports` | Reports inbox / sent | All |
| `/settings` | Profile & password | All |
| `/login` | Login | Public |

## Developer Reference

See [`FRONTEND_GUIDE.md`](./FRONTEND_GUIDE.md) for the full architecture walkthrough, API service map, hook conventions, and a prioritised list of known bugs with ready-to-apply fixes.
