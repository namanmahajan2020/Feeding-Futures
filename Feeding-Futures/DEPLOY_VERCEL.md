# Feeding Futures on Vercel

Deploy this repo as four separate Vercel projects:

1. `backend`
2. `user`
3. `admin`
4. `delivery`

Each project should point to a different root directory inside `Feeding-Futures`.

## 1. Backend

Create a Vercel project with:

- Root Directory: `Feeding-Futures/backend`
- Framework Preset: `Other`
- Install Command: `npm install`
- Build Command: leave empty
- Output Directory: leave empty

Environment variables:

- `MONGO_URI`
- `FRONTEND_URLS`

Example `FRONTEND_URLS` value:

```text
https://feeding-futures-user.vercel.app,https://feeding-futures-admin.vercel.app,https://feeding-futures-delivery.vercel.app
```

After deploy, note the backend URL. You will use it in all frontend projects.

## 2. User App

Create a Vercel project with:

- Root Directory: `Feeding-Futures/user`
- Framework Preset: `Vite`

Environment variables:

- `VITE_API_BASE_URL`
- `VITE_API_ADMIN`
- `VITE_API_DELIVERY`

Example values:

```text
VITE_API_BASE_URL=https://feeding-futures-backend.vercel.app
VITE_API_ADMIN=https://feeding-futures-admin.vercel.app
VITE_API_DELIVERY=https://feeding-futures-delivery.vercel.app
```

## 3. Admin App

Create a Vercel project with:

- Root Directory: `Feeding-Futures/admin`
- Framework Preset: `Vite`

Environment variables:

- `VITE_API_URL`
- `VITE_API_START`
- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_PASSWORD`

Example values:

```text
VITE_API_URL=https://feeding-futures-backend.vercel.app
VITE_API_START=https://feeding-futures-user.vercel.app
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=change-me
```

## 4. Delivery App

Create a Vercel project with:

- Root Directory: `Feeding-Futures/delivery`
- Framework Preset: `Vite`

Environment variables:

- `VITE_API_BASE_URL`
- `VITE_API_START`

Example values:

```text
VITE_API_BASE_URL=https://feeding-futures-backend.vercel.app
VITE_API_START=https://feeding-futures-user.vercel.app
```

## Deploy order

Use this order so URLs are available when you set env vars:

1. Deploy `backend`
2. Deploy `admin`
3. Deploy `delivery`
4. Deploy `user`
5. Update `FRONTEND_URLS` in `backend` with the real frontend URLs
6. Redeploy `backend`

## Local checks before deploy

Run these from each app folder:

```powershell
npm install
npm run build
```

For backend local testing:

```powershell
npm install
npm start
```

## Important note

The admin login is frontend-only and uses `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in the built client. That means those credentials are visible in the browser bundle. This is acceptable only for demo use, not real authentication.
