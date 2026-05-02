# Vercel Deployment Guide (Monorepo)

This repository is a PNPM + Turborepo monorepo with one host app and multiple module federation remotes.

## 1) Deploy each remote app first

Create separate Vercel projects for:

- `apps/auth-app`
- `apps/dashboard-app`
- `apps/patient-app`
- `apps/analytics-app`

For each project:

- Framework preset: `Vite`
- Root directory: app folder (example: `apps/auth-app`)
- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install --frozen-lockfile`

After deployment, copy each app URL and append `/assets/remoteEntry.js`.

Example:

- `https://auth-app-example.vercel.app/assets/remoteEntry.js`

## 2) Deploy the host app (`shell-app`)

Create a Vercel project for `apps/shell-app` with:

- Framework preset: `Vite`
- Root directory: `apps/shell-app`
- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install --frozen-lockfile`

Add these environment variables in the shell-app Vercel project:

- `VITE_AUTH_REMOTE_URL`
- `VITE_DASHBOARD_REMOTE_URL`
- `VITE_PATIENT_REMOTE_URL`
- `VITE_ANALYTICS_REMOTE_URL`

Each value should be the deployed remote entry URL (ending with `/assets/remoteEntry.js`).

## 3) Monorepo note

`package.json` now has a valid package manager field:

- `"packageManager": "pnpm@10.33.2"`

This is required by Turborepo and also avoids Vercel build parsing errors.

## 4) SPA route fallback

Each app includes `vercel.json` with a rewrite to `index.html`, so client-side routes work on refresh/direct access.
