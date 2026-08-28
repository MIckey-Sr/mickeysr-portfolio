# Publicar MickeySr en Cloudflare Pages

El proyecto ya genera una salida compatible con Cloudflare Pages y conserva las rutas dinámicas del portafolio y del Studio.

## Configuración del proyecto Pages

- Proyecto: `mickeysr`
- Rama de producción: `main`
- Comando de compilación: `npm run build:pages`
- Directorio de salida: `dist/pages`
- Versión de Node recomendada: `22`

Conecta el repositorio desde **Workers & Pages → Create application → Pages → Connect to Git**. Después de la primera publicación, cada cambio enviado a `main` se volverá a desplegar automáticamente.

Los cambios de contenido hechos en `/studio` no necesitan una nueva compilación: el sitio consulta Sanity cada 60 segundos. Para que el Studio funcione, agrega la URL final `https://mickeysr.pages.dev` como origen CORS en Sanity y activa **Allow credentials**.
