# Exponential Todo

Simple Todo tracker built with Next.js 15 App Router, Tailwind CSS, and server actions. Tasks live in an in-memory store so the UI can add, edit, mark complete, and delete items with zero client-side data stores.

## Features

- ✅ Add, edit, delete, and toggle completion on todos
- ✅ API route + in-memory store power add/edit/delete/toggle mutations (resets on server restart)
- ✅ Tailwind-powered UI with accessible forms and keyboard-friendly controls
- ✅ App Router layout/page structure that keeps components easy to read

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to use the app. ESLint runs with `npm run lint`.

## Deployment

Deploy the repo to Vercel (`vercel deploy`) and share the live URL here once ready:

- GitHub Repo: https://github.com/<your-org>/todo_exponential
- Vercel URL: _add after deployment_

## Notes & assumptions

- Todos persist only for the current server session per the spec.
- Styling sticks to Tailwind primitives (no shadcn/shimmer) to keep the code readable.
- Mutations flow through the `/api/todos` route, and client helpers in `app/actions.ts` call into it.

## Shortcuts

- Utilization of VSCode with Codex
