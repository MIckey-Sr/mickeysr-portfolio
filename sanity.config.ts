"use client";

import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";

const colorValidation = (rule: { regex: (pattern: RegExp, options: { name: string }) => unknown }) =>
  rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "hexadecimal color (#RRGGBB)" });

const siteSettings = defineType({
  name: "siteSettings",
  title: "Design and Content",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "appearance", title: "Colors and Typography" },
    { name: "home", title: "Home" },
    { name: "sections", title: "Sections" },
    { name: "links", title: "Links" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Primary Brand Name", type: "string", group: "brand", initialValue: "MICKEY" }),
    defineField({ name: "brandAccent", title: "Accent Brand Name", type: "string", group: "brand", initialValue: "SR" }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "brand", options: { hotspot: true }, description: "Optional. If left empty, the default cube mark is used." }),
    defineField({ name: "avatar", title: "Avatar", type: "image", group: "brand", options: { hotspot: true } }),
    defineField({ name: "banner", title: "Hero Banner", type: "image", group: "brand", options: { hotspot: true } }),
    defineField({ name: "handle", title: "Username / Signature", type: "string", group: "brand", initialValue: "@Mickey_Sr" }),

    defineField({ name: "backgroundColor", title: "Background", type: "string", group: "appearance", initialValue: "#02070b", validation: colorValidation }),
    defineField({ name: "surfaceColor", title: "Cards / Surfaces", type: "string", group: "appearance", initialValue: "#09151d", validation: colorValidation }),
    defineField({ name: "textColor", title: "Primary Text", type: "string", group: "appearance", initialValue: "#eefcff", validation: colorValidation }),
    defineField({ name: "mutedColor", title: "Secondary Text", type: "string", group: "appearance", initialValue: "#86a1ab", validation: colorValidation }),
    defineField({ name: "accentColor", title: "Primary Accent", type: "string", group: "appearance", initialValue: "#19d7e5", validation: colorValidation }),
    defineField({ name: "accentBrightColor", title: "Bright Accent / Lines", type: "string", group: "appearance", initialValue: "#7af7ff", validation: colorValidation }),
    defineField({
      name: "headingFont", title: "Heading Font", type: "string", group: "appearance", initialValue: "space-grotesk",
      options: { list: [
        { title: "Space Grotesk · modern", value: "space-grotesk" },
        { title: "Sora · premium", value: "sora" },
        { title: "Rajdhani · tech", value: "rajdhani" },
        { title: "Chakra Petch · gaming", value: "chakra-petch" },
        { title: "Outfit · clean", value: "outfit" },
      ], layout: "radio" },
    }),
    defineField({
      name: "bodyFont", title: "Body Font", type: "string", group: "appearance", initialValue: "manrope",
      options: { list: [
        { title: "Manrope", value: "manrope" },
        { title: "Inter", value: "inter" },
        { title: "Sora", value: "sora" },
        { title: "IBM Plex Sans", value: "ibm-plex-sans" },
        { title: "Outfit", value: "outfit" },
      ], layout: "radio" },
    }),

    defineField({ name: "navPortfolio", title: "Menu: Portfolio", type: "string", group: "home", initialValue: "Portfolio" }),
    defineField({ name: "navSpecialties", title: "Menu: Specialties", type: "string", group: "home", initialValue: "Specialties" }),
    defineField({ name: "navAbout", title: "Menu: About", type: "string", group: "home", initialValue: "About" }),
    defineField({ name: "storeButtonLabel", title: "Store Button (Header)", type: "string", group: "home", initialValue: "Visit Store" }),
    defineField({ name: "heroStatus", title: "Hero Status Badge", type: "string", group: "home", initialValue: "Official Portfolio" }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string", group: "home", initialValue: "Minecraft 3D Artist · Model Creator" }),
    defineField({ name: "heroTitle", title: "Hero Primary Title", type: "string", group: "home", initialValue: "MICKEY" }),
    defineField({ name: "heroAccent", title: "Hero Accent Title", type: "string", group: "home", initialValue: "SR" }),
    defineField({ name: "heroTagline", title: "Main Tagline", type: "text", rows: 2, group: "home", initialValue: "Crafting 3D worlds,\none block at a time." }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3, group: "home" }),
    defineField({ name: "projectsButtonLabel", title: "Projects Button", type: "string", group: "home", initialValue: "View Projects" }),
    defineField({ name: "artstationButtonLabel", title: "ArtStation Button", type: "string", group: "home", initialValue: "View ArtStation" }),
    defineField({
      name: "stats", title: "Statistics", type: "array", group: "home", validation: (rule) => rule.max(4),
      of: [{ type: "object", fields: [
        { name: "value", title: "Value", type: "string" },
        { name: "label", title: "Label", type: "string" },
      ], preview: { select: { title: "value", subtitle: "label" } } }],
    }),

    defineField({ name: "portfolioEyebrow", title: "Portfolio: Eyebrow", type: "string", group: "sections" }),
    defineField({ name: "portfolioTitle", title: "Portfolio: Title", type: "string", group: "sections" }),
    defineField({ name: "portfolioAccent", title: "Portfolio: Accent Title", type: "string", group: "sections" }),
    defineField({ name: "portfolioDescription", title: "Portfolio: Description", type: "text", rows: 3, group: "sections" }),
    defineField({ name: "specialtiesEyebrow", title: "Specialties: Eyebrow", type: "string", group: "sections" }),
    defineField({ name: "specialtiesTitle", title: "Specialties: Title", type: "string", group: "sections" }),
    defineField({ name: "specialtiesAccent", title: "Specialties: Accent Title", type: "string", group: "sections" }),
    defineField({ name: "specialtiesDescription", title: "Specialties: Description", type: "text", rows: 3, group: "sections" }),
    defineField({
      name: "disciplines", title: "Specialty Cards", type: "array", group: "sections", validation: (rule) => rule.max(8),
      of: [{ type: "object", fields: [
        { name: "icon", title: "Symbol", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Description", type: "text", rows: 3 },
      ], preview: { select: { title: "title", subtitle: "text" } } }],
    }),
    defineField({ name: "aboutEyebrow", title: "About: Eyebrow", type: "string", group: "sections" }),
    defineField({ name: "aboutTitle", title: "About: Title", type: "string", group: "sections" }),
    defineField({ name: "aboutAccent", title: "About: Accent Title", type: "string", group: "sections" }),
    defineField({ name: "aboutParagraphs", title: "About: Paragraphs", type: "array", of: [{ type: "text", rows: 4 }], group: "sections" }),
    defineField({ name: "finalEyebrow", title: "Closing: Eyebrow", type: "string", group: "sections" }),
    defineField({ name: "finalTitle", title: "Closing: Title", type: "string", group: "sections" }),
    defineField({ name: "finalAccent", title: "Closing: Accent Title", type: "string", group: "sections" }),
    defineField({ name: "finalDescription", title: "Closing: Description", type: "text", rows: 2, group: "sections" }),
    defineField({ name: "finalButtonLabel", title: "Closing: Button", type: "string", group: "sections" }),

    defineField({ name: "storeUrl", title: "Store", type: "url", group: "links" }),
    defineField({ name: "artstationUrl", title: "ArtStation", type: "url", group: "links" }),
    defineField({ name: "sketchfabUrl", title: "Sketchfab", type: "url", group: "links" }),
    defineField({ name: "youtubeUrl", title: "YouTube", type: "url", group: "links" }),
    defineField({ name: "tiktokUrl", title: "TikTok", type: "url", group: "links" }),
  ],
  preview: { prepare: () => ({ title: "Site Design, Typography, and Content", subtitle: "General MickeySr configuration" }) },
});

const category = defineType({
  name: "portfolioCategory",
  title: "Categories",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Identifier", type: "slug", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 10, description: "A lower number appears first." }),
  ],
  orderings: [{ title: "Portfolio Order", name: "portfolioOrder", by: [{ field: "order", direction: "asc" }, { field: "title", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});

const project = defineType({
  name: "portfolioProject",
  title: "Projects",
  type: "document",
  groups: [
    { name: "main", title: "Information", default: true },
    { name: "media", title: "Images and GIFs" },
    { name: "settings", title: "Organization" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "main", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Identifier", type: "slug", group: "main", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5, group: "main" }),
    defineField({ name: "externalUrl", title: "Optional External Link", type: "url", group: "main", description: "For example: ArtStation, store, or project page." }),
    defineField({ name: "cover", title: "Cover", type: "image", group: "media", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alternative Text" }], validation: (rule) => rule.required() }),
    defineField({
      name: "gallery", title: "Image and GIF Gallery", type: "array", group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [
        { name: "alt", type: "string", title: "Alternative Text" },
        { name: "caption", type: "string", title: "Image Caption" },
      ] }], options: { layout: "grid" },
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "portfolioCategory" }], group: "settings", validation: (rule) => rule.required() }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, group: "settings" }),
    defineField({ name: "publishedAt", title: "Project Date", type: "datetime", group: "settings", initialValue: () => new Date().toISOString() }),
    defineField({ name: "order", title: "Order Within Category", type: "number", initialValue: 10, group: "settings", description: "A lower number appears first." }),
  ],
  orderings: [{ title: "Portfolio Order", name: "portfolioOrder", by: [{ field: "order", direction: "asc" }, { field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category.title", media: "cover" } },
});

export default defineConfig({
  name: "mickeysrPortfolio",
  title: "MickeySr · Portfolio Dashboard",
  projectId: "m6t788zn",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({
    structure: (S) => S.list().title("Manage Site").items([
      S.listItem().title("Design and Content").id("siteSettings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings"),
      ),
      S.divider(),
      S.documentTypeListItem("portfolioCategory").title("Categories"),
      S.documentTypeListItem("portfolioProject").title("Projects"),
    ]),
  })],
  schema: { types: [siteSettings, category, project] },
});
