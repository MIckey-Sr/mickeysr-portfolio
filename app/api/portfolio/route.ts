import { defaultSiteSettings, type SiteSettings } from "../../site-defaults";

const SANITY_PROJECT_ID = "m6t788zn";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-08-28";

type SanityRecord = Record<string, unknown>;

const sampleProjects = {
  anubis: {
    id: "sample-anubis",
    title: "Anubis Ritual Ensemble",
    coverUrl: "/project-anubis.jpg",
    externalUrl: "",
    publishedAt: "",
    tags: ["Set"],
    description: "Colección completa de armas, herramientas, armadura y objetos inspirados en el universo de Anubis.",
    assets: [{ id: "sample-anubis-cover", type: "image", imageUrl: "/project-anubis.jpg", title: "Anubis Ritual Ensemble" }],
  },
  soulReaper: {
    id: "sample-soul-reaper",
    title: "Soul Reaper",
    coverUrl: "/project-soul-reaper.jpg",
    externalUrl: "",
    publishedAt: "",
    tags: ["Weapon"],
    description: "Tres variantes cromáticas con equipo, armas y una silueta reconocible.",
    assets: [{ id: "sample-soul-reaper-cover", type: "image", imageUrl: "/project-soul-reaper.jpg", title: "Soul Reaper" }],
  },
  cosmicShadow: {
    id: "sample-cosmic-shadow",
    title: "Cosmic Shadow",
    coverUrl: "/project-cosmic-shadow.jpg",
    externalUrl: "",
    publishedAt: "",
    tags: ["Weapon"],
    description: "Colección compacta de estética cósmica, energía azul y acabado voxel.",
    assets: [{ id: "sample-cosmic-shadow-cover", type: "image", imageUrl: "/project-cosmic-shadow.jpg", title: "Cosmic Shadow" }],
  },
};

const portfolioQuery = `{
  "settings": *[_type == "siteSettings"][0] {
    ...,
    "logoUrl": logo.asset->url,
    "avatarUrl": avatar.asset->url,
    "bannerUrl": banner.asset->url
  },
  "categories": *[_type == "portfolioCategory"] | order(coalesce(order, 999) asc, title asc) {
    _id,
    title,
    "position": coalesce(order, 999),
    description
  },
  "projects": *[_type == "portfolioProject"] | order(coalesce(order, 999) asc, coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    description,
    externalUrl,
    publishedAt,
    tags,
    "position": coalesce(order, 999),
    "coverUrl": cover.asset->url,
    "category": category->{_id, title, "position": coalesce(order, 999)},
    "gallery": gallery[]{
      _key,
      alt,
      caption,
      "imageUrl": asset->url,
      "mimeType": asset->mimeType
    }
  }
}`;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function number(value: unknown) {
  return typeof value === "number" ? value : 999;
}

function records(value: unknown): SanityRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is SanityRecord => Boolean(item && typeof item === "object"))
    : [];
}

function strings(value: unknown) {
  return Array.isArray(value) ? value.map((item) => text(item)).filter(Boolean) : [];
}

const settingTextKeys = Object.keys(defaultSiteSettings).filter((key) =>
  !["stats", "disciplines", "aboutParagraphs"].includes(key),
) as (keyof SiteSettings)[];

function normalizeSettings(value: unknown): SiteSettings {
  const record = value && typeof value === "object" ? value as SanityRecord : {};
  const settings = { ...defaultSiteSettings };

  for (const key of settingTextKeys) {
    const next = text(record[key]);
    if (next) Object.assign(settings, { [key]: next });
  }

  const stats = records(record.stats)
    .map((item) => ({ value: text(item.value), label: text(item.label) }))
    .filter((item) => item.value || item.label);
  const disciplines = records(record.disciplines)
    .map((item) => ({ icon: text(item.icon), title: text(item.title), text: text(item.text) }))
    .filter((item) => item.title || item.text);
  const aboutParagraphs = strings(record.aboutParagraphs);

  return {
    ...settings,
    stats: stats.length ? stats : defaultSiteSettings.stats,
    disciplines: disciplines.length ? disciplines : defaultSiteSettings.disciplines,
    aboutParagraphs: aboutParagraphs.length ? aboutParagraphs : defaultSiteSettings.aboutParagraphs,
  };
}

function samplePortfolio(reason: "empty" | "unavailable", settings = defaultSiteSettings) {
  return {
    source: "sample",
    sourceState: reason,
    studioUrl: "/studio",
    settings,
    categories: [
      { id: "sample-weapons", title: "Weapons", position: 0, description: "", projects: [sampleProjects.soulReaper, sampleProjects.cosmicShadow] },
      { id: "sample-set", title: "Set", position: 1, description: "", projects: [sampleProjects.anubis] },
    ],
  };
}

async function sanityPortfolio() {
  const endpoint = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`);
  endpoint.searchParams.set("query", portfolioQuery);
  endpoint.searchParams.set("perspective", "published");
  endpoint.searchParams.set("returnQuery", "false");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Sanity request failed (${response.status})`);
    const payload = await response.json() as { result?: SanityRecord };
    const result = payload.result || {};
    const categories = records(result.categories);
    const projects = records(result.projects);
    const settings = normalizeSettings(result.settings);

    if (!categories.length && !projects.length) return samplePortfolio("empty", settings);

    const normalizedCategories = categories.map((category) => {
      const categoryId = text(category._id);
      return {
        id: categoryId,
        title: text(category.title) || "Sin título",
        position: number(category.position),
        description: text(category.description),
        projects: projects
          .filter((project) => text((project.category as SanityRecord | undefined)?._id) === categoryId)
          .map((project) => {
            const gallery = records(project.gallery);
            const coverUrl = text(project.coverUrl);
            const assets = gallery
              .map((asset, index) => ({
                id: text(asset._key) || `${text(project._id)}-${index}`,
                type: text(asset.mimeType).includes("gif") ? "gif" : "image",
                imageUrl: text(asset.imageUrl),
                title: text(asset.alt) || text(asset.caption) || text(project.title),
              }))
              .filter((asset) => asset.imageUrl);

            return {
              id: text(project._id),
              title: text(project.title) || "Proyecto sin título",
              coverUrl,
              externalUrl: text(project.externalUrl),
              publishedAt: text(project.publishedAt),
              tags: strings(project.tags),
              description: text(project.description),
              assets: assets.length
                ? assets
                : coverUrl
                  ? [{ id: `${text(project._id)}-cover`, type: "image", imageUrl: coverUrl, title: text(project.title) }]
                  : [],
            };
          }),
      };
    });

    return {
      source: "sanity",
      sourceState: "connected",
      studioUrl: "/studio",
      settings,
      categories: normalizedCategories,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  try {
    return Response.json(await sanityPortfolio(), {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return Response.json(samplePortfolio("unavailable"), {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }
}
