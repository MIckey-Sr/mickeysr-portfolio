# MickeySr Portfolio

Portafolio de MickeySr enfocado en modelos 3D, armas, armaduras, colecciones y recursos visuales para Minecraft.

## Stack

- TypeScript
- React
- Vinext + Vite
- Sanity CMS
- Sketchfab
- Cloudflare Pages

## Estructura

El contenido principal del portafolio se gestiona desde Sanity y se presenta en galerías organizadas por categorías. Los proyectos pueden incluir imágenes, descripciones, etiquetas, enlaces externos y contenido 3D.

La integración con Sketchfab permite complementar las galerías con modelos interactivos, mientras que Cloudflare Pages se utiliza para la publicación del sitio.

## Desarrollo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

Build preparado para Cloudflare Pages:

```bash
npm run build:pages
```

## Administración de contenido

El Studio de Sanity está disponible en:

```text
/studio
```

Desde ahí se pueden administrar proyectos, categorías y la configuración visual del portafolio sin modificar directamente el código del sitio.

## Despliegue

La configuración recomendada para Cloudflare Pages se encuentra en `CLOUDFLARE-PAGES.md`.
