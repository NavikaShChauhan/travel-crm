# Voyage — Travel CRM (Frontend Foundation)

This is the **frontend foundation** for an enterprise Travel CRM. It is built to be
the long-term shell of a full MERN application — the pieces here (routing, layout,
API layer, service layer, module boundaries) are the pieces that stay stable while a
Node.js + Express + MongoDB backend is built underneath them.

This is **not** a finished CRM. Module pages are placeholders on purpose — see
[Current state](#current-state) below.

---

## Tech stack

React 19 · Vite · JavaScript · React Router v7 · Material UI · React Icons ·
Framer Motion · Recharts · React Hook Form + Yup · Axios · Context API

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` if you need to point `VITE_API_BASE_URL` at a real
backend later — it defaults to `/api`.

---

## Architecture

### The data-flow contract

This is the single most important rule in this codebase:

```
Page component  →  services/*.service.js  →  api/*.api.js  →  axiosClient  →  Express API
```

**A page or component never calls `axios` or an `api/*.api.js` file directly.**
Right now, since there is no backend yet, most pages instead read directly from a
mock data file in their own module's `data/` folder. When a real endpoint exists,
only the **service** function's body changes (from throwing "not implemented" to
calling the matching `api/*.api.js` function) — the page that calls the service
never has to change. `modules/dashboard` is built out as a working example of this
pattern end-to-end; every other module is a placeholder ready for the same treatment.

### Folder structure

```
src/
  assets/            static images/icons
  components/         cross-module, reusable UI (common, ui, forms, tables,
                      cards, modals, drawers, loaders)
  layouts/            MainLayout, Sidebar, Navbar, Breadcrumbs, menus
  contexts/           AuthContext, NotificationContext, SidebarContext
  hooks/              cross-module hooks (useAsync, useDebounce)
  routes/             AppRoutes (aggregator), ProtectedRoute, NotFoundPage
  services/           business-logic layer, one file per domain
  api/                HTTP layer, one file per domain + shared axiosClient
  utils/              formatters, validators — no side effects
  constants/          ROUTES, NAV_ITEMS, app-wide constants
  styles/             MUI theme + design tokens, global.css
  mock-data/          seed data for app-level contexts (current user, notifications)
  modules/
    <module>/
      pages/          route-level screens
      components/     module-local UI, not reused elsewhere
      hooks/           module-local hooks
      services/       (reserved — most modules currently use the top-level
                      services/<module>.service.js instead; move logic here
                      if a module's service layer grows complex)
      utils/           module-local helpers
      constants/       module-local constants (form schemas, option lists…)
      styles/          module-local style overrides, if needed
      data/            mock JSON/JS used until the real API exists
      routes.jsx       this module's route list, imported by AppRoutes
```

### Why modules own their routes

Each `modules/<name>/routes.jsx` exports its own route array. `routes/AppRoutes.jsx`
only imports and concatenates them. This means two developers working on, say,
`sales` and `finance` never touch the same line of a shared router file — which is
the point of the "modules must remain isolated" requirement for a multi-developer
git workflow. **When you add a new module page, register it in that module's own
`routes.jsx` — never add routes directly to `AppRoutes.jsx`.**

### Design tokens

The palette, type scale, and component overrides live in `src/styles/theme.js`
(exported as both an MUI theme and a plain `tokens` object for use outside MUI,
e.g. in Recharts). The visual identity: deep "waypoint navy" surfaces, a single
"compass gold" accent reserved for active states and key actions, and teal/coral
reserved for confirmed/at-risk states so they stay meaningful.

---

## Current state

- ✅ Full project scaffold, routing, layout, contexts, theme
- ✅ `api/` and `services/` layers exist for every domain with `TODO`-commented
  endpoints — **no HTTP calls are implemented yet**
- ✅ `modules/dashboard` is built out as a reference implementation of the
  page → data pattern
- ⏳ All other modules (`inquiry`, `sales`, `itinerary`, `operations`, `finance`,
  `suppliers`, `customers`, `partners`, `reports`, `workflow`, `notifications`,
  `settings`) contain only a placeholder page — real screens are built module by
  module from here
- ⏳ Auth is mocked (`AuthContext` seeds a logged-in user) — no login screen or
  real session handling yet

## Backend integration checklist

When the Express + MongoDB backend is ready:

1. Set `VITE_API_BASE_URL` in `.env`
2. Implement the request in the relevant `api/<domain>.api.js` file (the shape is
   already TODO-commented)
3. Update the matching `services/<domain>.service.js` function to call it and
   return `response.data`
4. Swap the page's mock-data import for a `useAsync(() => xService.getAll())` call
5. Delete the module's `data/*.mock.js` file once nothing imports it
