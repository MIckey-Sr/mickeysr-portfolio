# MickeySr Portfolio

Official portfolio for MickeySr, focused on 3D models, weapons, armor, collections, and visual resources for Minecraft.

## Stack

- TypeScript
- React
- Vinext + Vite
- Sanity CMS
- Sketchfab
- Cloudflare Pages

## Structure

The main portfolio content is managed through Sanity and displayed in galleries organized by category. Projects can include images, descriptions, tags, external links, and 3D content.

Sketchfab integration adds interactive models to the portfolio, while Cloudflare Pages is used for deployment.

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Cloudflare Pages build:

```bash
npm run build:pages
```

## Content Management

Sanity Studio is available at:

```text
/studio
```

Projects, categories, and visual settings can be managed from the Studio without directly editing the site code.

## Deployment

The recommended Cloudflare Pages configuration is documented in `CLOUDFLARE-PAGES.md`.
