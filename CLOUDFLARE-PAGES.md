# Deploying MickeySr to Cloudflare Pages

The project generates output compatible with Cloudflare Pages while preserving the portfolio and Studio dynamic routes.

## Pages project configuration

- Project: `mickeysr`
- Production branch: `main`
- Build command: `npm run build:pages`
- Output directory: `dist/pages`
- Recommended Node version: `22`

Connect the repository from **Workers & Pages → Create application → Pages → Connect to Git**. After the first deployment, every change pushed to `main` will be deployed automatically.

Content changes made in `/studio` do not require a new build: the site checks Sanity every 60 seconds. For the Studio to work correctly, add the final `https://mickeysr.pages.dev` URL as a CORS origin in Sanity and enable **Allow credentials**.
