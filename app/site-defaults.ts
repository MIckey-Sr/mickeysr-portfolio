export type SiteStat = {
  value: string;
  label: string;
};

export type SiteDiscipline = {
  icon: string;
  title: string;
  text: string;
};

export type SiteSettings = {
  brandName: string;
  brandAccent: string;
  logoUrl: string;
  avatarUrl: string;
  bannerUrl: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
  accentBrightColor: string;
  headingFont: string;
  bodyFont: string;
  navPortfolio: string;
  navSpecialties: string;
  navAbout: string;
  storeButtonLabel: string;
  heroStatus: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroTagline: string;
  heroDescription: string;
  projectsButtonLabel: string;
  artstationButtonLabel: string;
  stats: SiteStat[];
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioAccent: string;
  portfolioDescription: string;
  specialtiesEyebrow: string;
  specialtiesTitle: string;
  specialtiesAccent: string;
  specialtiesDescription: string;
  disciplines: SiteDiscipline[];
  aboutEyebrow: string;
  aboutTitle: string;
  aboutAccent: string;
  aboutParagraphs: string[];
  handle: string;
  finalEyebrow: string;
  finalTitle: string;
  finalAccent: string;
  finalDescription: string;
  finalButtonLabel: string;
  storeUrl: string;
  artstationUrl: string;
  sketchfabUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
};

export const defaultSiteSettings: SiteSettings = {
  brandName: "MICKEY",
  brandAccent: "SR",
  logoUrl: "",
  avatarUrl: "/mickey-avatar.jpg",
  bannerUrl: "/mickey-banner.jpg",
  backgroundColor: "#02070b",
  surfaceColor: "#09151d",
  textColor: "#eefcff",
  mutedColor: "#86a1ab",
  accentColor: "#19d7e5",
  accentBrightColor: "#7af7ff",
  headingFont: "space-grotesk",
  bodyFont: "manrope",
  navPortfolio: "Portfolio",
  navSpecialties: "Specialties",
  navAbout: "About",
  storeButtonLabel: "Visit Store",
  heroStatus: "Official Portfolio",
  heroEyebrow: "Minecraft 3D Artist · Model Creator",
  heroTitle: "MICKEY",
  heroAccent: "SR",
  heroTagline: "Crafting 3D worlds,\none block at a time.",
  heroDescription: "I create 3D models, weapons, and collections that turn ideas into distinctive experiences inside Minecraft.",
  projectsButtonLabel: "View Projects",
  artstationButtonLabel: "View ArtStation",
  stats: [
    { value: "16", label: "Resources" },
    { value: "102", label: "Purchases" },
    { value: "589", label: "Downloads" },
  ],
  portfolioEyebrow: "Synchronized Portfolio",
  portfolioTitle: "A living archive.",
  portfolioAccent: "Always evolving.",
  portfolioDescription: "The private dashboard and Sketchfab power the internal galleries. New projects and categories are reflected automatically across the portfolio.",
  specialtiesEyebrow: "The work behind the result",
  specialtiesTitle: "One visual direction.",
  specialtiesAccent: "Every detail matters.",
  specialtiesDescription: "From the first volume to the final presentation, each piece is designed to feel part of the same universe.",
  disciplines: [
    { icon: "◇", title: "Voxel Modeling", text: "Clear silhouettes and proportions designed around Minecraft's visual language." },
    { icon: "▦", title: "Textures", text: "Palettes, materials, and pixel-by-pixel details that give each asset its identity." },
    { icon: "✦", title: "Collections", text: "Weapons, tools, armor, and accessories designed to work as a cohesive system." },
    { icon: "▶", title: "3D Presentation", text: "Scenes and previews that present every resource clearly before it reaches the game." },
  ],
  aboutEyebrow: "Behind the pixels",
  aboutTitle: "Designing so that",
  aboutAccent: "every world has an identity.",
  aboutParagraphs: [
    "I'm MickeySr, a creator of models and 3D content for Minecraft. I build complete collections in Blockbench, from shape and texture to the final presentation of each resource.",
    "My style combines the clarity of pixel art with epic, cosmic, and fantasy themes. The result is content designed to stand out in-game.",
  ],
  handle: "@Mickey_Sr",
  finalEyebrow: "MickeySr · 3D Model Creator",
  finalTitle: "Find the next",
  finalAccent: "world for your server.",
  finalDescription: "Explore the full catalog of Minecraft models and collections.",
  finalButtonLabel: "Visit Official Store",
  storeUrl: "https://builtbybit.com/creators/mic-keysr.475770/",
  artstationUrl: "https://www.artstation.com/mickeysr",
  sketchfabUrl: "https://sketchfab.com/mickeysr",
  youtubeUrl: "https://www.youtube.com/@Mickey_Sr",
  tiktokUrl: "https://www.tiktok.com/@srmickeysr",
};

export const headingFontFamilies: Record<string, string> = {
  "space-grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  sora: '"Sora", ui-sans-serif, system-ui, sans-serif',
  rajdhani: '"Rajdhani", ui-sans-serif, system-ui, sans-serif',
  "chakra-petch": '"Chakra Petch", ui-sans-serif, system-ui, sans-serif',
  outfit: '"Outfit", ui-sans-serif, system-ui, sans-serif',
};

export const bodyFontFamilies: Record<string, string> = {
  manrope: '"Manrope", ui-sans-serif, system-ui, sans-serif',
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  sora: '"Sora", ui-sans-serif, system-ui, sans-serif',
  "ibm-plex-sans": '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  outfit: '"Outfit", ui-sans-serif, system-ui, sans-serif',
};
