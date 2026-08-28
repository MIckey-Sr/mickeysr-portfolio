"use client";

import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";

const colorValidation = (rule: { regex: (pattern: RegExp, options: { name: string }) => unknown }) =>
  rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "color hexadecimal (#RRGGBB)" });

const siteSettings = defineType({
  name: "siteSettings",
  title: "Diseño y textos",
  type: "document",
  groups: [
    { name: "brand", title: "Marca", default: true },
    { name: "appearance", title: "Colores y letras" },
    { name: "home", title: "Inicio" },
    { name: "sections", title: "Secciones" },
    { name: "links", title: "Enlaces" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Nombre blanco", type: "string", group: "brand", initialValue: "MICKEY" }),
    defineField({ name: "brandAccent", title: "Nombre de color", type: "string", group: "brand", initialValue: "SR" }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "brand", options: { hotspot: true }, description: "Opcional. Si lo dejas vacío se usa el cubo actual." }),
    defineField({ name: "avatar", title: "Avatar", type: "image", group: "brand", options: { hotspot: true } }),
    defineField({ name: "banner", title: "Portada grande", type: "image", group: "brand", options: { hotspot: true } }),
    defineField({ name: "handle", title: "Usuario / firma", type: "string", group: "brand", initialValue: "@Mickey_Sr" }),

    defineField({ name: "backgroundColor", title: "Fondo", type: "string", group: "appearance", initialValue: "#02070b", validation: colorValidation }),
    defineField({ name: "surfaceColor", title: "Tarjetas", type: "string", group: "appearance", initialValue: "#09151d", validation: colorValidation }),
    defineField({ name: "textColor", title: "Texto principal", type: "string", group: "appearance", initialValue: "#eefcff", validation: colorValidation }),
    defineField({ name: "mutedColor", title: "Texto secundario", type: "string", group: "appearance", initialValue: "#86a1ab", validation: colorValidation }),
    defineField({ name: "accentColor", title: "Color principal", type: "string", group: "appearance", initialValue: "#19d7e5", validation: colorValidation }),
    defineField({ name: "accentBrightColor", title: "Brillo / líneas", type: "string", group: "appearance", initialValue: "#7af7ff", validation: colorValidation }),
    defineField({
      name: "headingFont", title: "Letra de títulos", type: "string", group: "appearance", initialValue: "space-grotesk",
      options: { list: [
        { title: "Space Grotesk · moderna", value: "space-grotesk" },
        { title: "Sora · premium", value: "sora" },
        { title: "Rajdhani · tecnológica", value: "rajdhani" },
        { title: "Chakra Petch · gaming", value: "chakra-petch" },
        { title: "Outfit · limpia", value: "outfit" },
      ], layout: "radio" },
    }),
    defineField({
      name: "bodyFont", title: "Letra de párrafos", type: "string", group: "appearance", initialValue: "manrope",
      options: { list: [
        { title: "Manrope", value: "manrope" },
        { title: "Inter", value: "inter" },
        { title: "Sora", value: "sora" },
        { title: "IBM Plex Sans", value: "ibm-plex-sans" },
        { title: "Outfit", value: "outfit" },
      ], layout: "radio" },
    }),

    defineField({ name: "navPortfolio", title: "Menú: portafolio", type: "string", group: "home", initialValue: "Portafolio" }),
    defineField({ name: "navSpecialties", title: "Menú: especialidades", type: "string", group: "home", initialValue: "Especialidades" }),
    defineField({ name: "navAbout", title: "Menú: sobre mí", type: "string", group: "home", initialValue: "Sobre mí" }),
    defineField({ name: "storeButtonLabel", title: "Botón tienda (cabecera)", type: "string", group: "home", initialValue: "Visitar tienda" }),
    defineField({ name: "heroStatus", title: "Sello sobre la portada", type: "string", group: "home", initialValue: "Portafolio oficial" }),
    defineField({ name: "heroEyebrow", title: "Texto pequeño del inicio", type: "string", group: "home", initialValue: "Minecraft 3D artist · Model creator" }),
    defineField({ name: "heroTitle", title: "Título blanco", type: "string", group: "home", initialValue: "MICKEY" }),
    defineField({ name: "heroAccent", title: "Título de color", type: "string", group: "home", initialValue: "SR" }),
    defineField({ name: "heroTagline", title: "Frase principal", type: "text", rows: 2, group: "home", initialValue: "Crafting 3D worlds,\none block at a time." }),
    defineField({ name: "heroDescription", title: "Descripción del inicio", type: "text", rows: 3, group: "home" }),
    defineField({ name: "projectsButtonLabel", title: "Botón proyectos", type: "string", group: "home", initialValue: "Ver proyectos" }),
    defineField({ name: "artstationButtonLabel", title: "Botón ArtStation", type: "string", group: "home", initialValue: "Ver ArtStation" }),
    defineField({
      name: "stats", title: "Estadísticas", type: "array", group: "home", validation: (rule) => rule.max(4),
      of: [{ type: "object", fields: [
        { name: "value", title: "Número", type: "string" },
        { name: "label", title: "Nombre", type: "string" },
      ], preview: { select: { title: "value", subtitle: "label" } } }],
    }),

    defineField({ name: "portfolioEyebrow", title: "Portafolio: texto pequeño", type: "string", group: "sections" }),
    defineField({ name: "portfolioTitle", title: "Portafolio: título", type: "string", group: "sections" }),
    defineField({ name: "portfolioAccent", title: "Portafolio: título de color", type: "string", group: "sections" }),
    defineField({ name: "portfolioDescription", title: "Portafolio: descripción", type: "text", rows: 3, group: "sections" }),
    defineField({ name: "specialtiesEyebrow", title: "Especialidades: texto pequeño", type: "string", group: "sections" }),
    defineField({ name: "specialtiesTitle", title: "Especialidades: título", type: "string", group: "sections" }),
    defineField({ name: "specialtiesAccent", title: "Especialidades: título de color", type: "string", group: "sections" }),
    defineField({ name: "specialtiesDescription", title: "Especialidades: descripción", type: "text", rows: 3, group: "sections" }),
    defineField({
      name: "disciplines", title: "Tarjetas de especialidades", type: "array", group: "sections", validation: (rule) => rule.max(8),
      of: [{ type: "object", fields: [
        { name: "icon", title: "Símbolo", type: "string" },
        { name: "title", title: "Título", type: "string" },
        { name: "text", title: "Descripción", type: "text", rows: 3 },
      ], preview: { select: { title: "title", subtitle: "text" } } }],
    }),
    defineField({ name: "aboutEyebrow", title: "Sobre mí: texto pequeño", type: "string", group: "sections" }),
    defineField({ name: "aboutTitle", title: "Sobre mí: título", type: "string", group: "sections" }),
    defineField({ name: "aboutAccent", title: "Sobre mí: título de color", type: "string", group: "sections" }),
    defineField({ name: "aboutParagraphs", title: "Sobre mí: párrafos", type: "array", of: [{ type: "text", rows: 4 }], group: "sections" }),
    defineField({ name: "finalEyebrow", title: "Cierre: texto pequeño", type: "string", group: "sections" }),
    defineField({ name: "finalTitle", title: "Cierre: título", type: "string", group: "sections" }),
    defineField({ name: "finalAccent", title: "Cierre: título de color", type: "string", group: "sections" }),
    defineField({ name: "finalDescription", title: "Cierre: descripción", type: "text", rows: 2, group: "sections" }),
    defineField({ name: "finalButtonLabel", title: "Cierre: botón", type: "string", group: "sections" }),

    defineField({ name: "storeUrl", title: "Tienda", type: "url", group: "links" }),
    defineField({ name: "artstationUrl", title: "ArtStation", type: "url", group: "links" }),
    defineField({ name: "sketchfabUrl", title: "Sketchfab", type: "url", group: "links" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url", group: "links" }),
    defineField({ name: "tiktokUrl", title: "TikTok", type: "url", group: "links" }),
  ],
  preview: { prepare: () => ({ title: "Diseño, letras y textos del sitio", subtitle: "Configuración general de MickeySr" }) },
});

const category = defineType({
  name: "portfolioCategory",
  title: "Categorías",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nombre", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Identificador", type: "slug", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Orden", type: "number", initialValue: 10, description: "Un número menor aparece primero." }),
  ],
  orderings: [{ title: "Orden del portafolio", name: "portfolioOrder", by: [{ field: "order", direction: "asc" }, { field: "title", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});

const project = defineType({
  name: "portfolioProject",
  title: "Proyectos",
  type: "document",
  groups: [
    { name: "main", title: "Información", default: true },
    { name: "media", title: "Imágenes y GIF" },
    { name: "settings", title: "Organización" },
  ],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", group: "main", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Identificador", type: "slug", group: "main", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 5, group: "main" }),
    defineField({ name: "externalUrl", title: "Enlace externo opcional", type: "url", group: "main", description: "Por ejemplo: ArtStation, tienda o página del proyecto." }),
    defineField({ name: "cover", title: "Portada", type: "image", group: "media", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Texto alternativo" }], validation: (rule) => rule.required() }),
    defineField({
      name: "gallery", title: "Galería de imágenes y GIF", type: "array", group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [
        { name: "alt", type: "string", title: "Texto alternativo" },
        { name: "caption", type: "string", title: "Pie de imagen" },
      ] }], options: { layout: "grid" },
    }),
    defineField({ name: "category", title: "Categoría", type: "reference", to: [{ type: "portfolioCategory" }], group: "settings", validation: (rule) => rule.required() }),
    defineField({ name: "tags", title: "Etiquetas", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, group: "settings" }),
    defineField({ name: "publishedAt", title: "Fecha del proyecto", type: "datetime", group: "settings", initialValue: () => new Date().toISOString() }),
    defineField({ name: "order", title: "Orden dentro de la categoría", type: "number", initialValue: 10, group: "settings", description: "Un número menor aparece primero." }),
  ],
  orderings: [{ title: "Orden del portafolio", name: "portfolioOrder", by: [{ field: "order", direction: "asc" }, { field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category.title", media: "cover" } },
});

export default defineConfig({
  name: "mickeysrPortfolio",
  title: "MickeySr · Panel del portafolio",
  projectId: "m6t788zn",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({
    structure: (S) => S.list().title("Administrar sitio").items([
      S.listItem().title("Diseño y textos").id("siteSettings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings"),
      ),
      S.divider(),
      S.documentTypeListItem("portfolioCategory").title("Categorías"),
      S.documentTypeListItem("portfolioProject").title("Proyectos"),
    ]),
  })],
  schema: { types: [siteSettings, category, project] },
});
