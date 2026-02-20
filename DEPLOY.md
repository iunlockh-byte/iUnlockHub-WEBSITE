# Deployment Guide for iUnlock Hub

## Option 1: Vercel (Recommended)
Vercel is the creators of Next.js and provides the easiest deployment flow.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub repository.
5.  Vercel will automatically detect the Next.js framework.
6.  Click **Deploy**.

## Option 2: Netlify
1.  Push your code to GitHub.
2.  Go to [Netlify.com](https://netlify.com).
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Connect to GitHub and select your repository.
5.  Netlify will detect the build settings (`npm run build`).
6.  Click **Deploy site**.

## Option 3: Manual / VPS
1.  Run `npm run build` locally or on your server.
2.  Run `npm start` to start the production server.
3.  Use a process manager like `pm2` to keep it running:
    ```bash
    npm install -g pm2
    pm2 start npm --name "iunlock-hub" -- start
    ```
