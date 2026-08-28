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
  navPortfolio: "Portafolio",
  navSpecialties: "Especialidades",
  navAbout: "Sobre mí",
  storeButtonLabel: "Visitar tienda",
  heroStatus: "Portafolio oficial",
  heroEyebrow: "Minecraft 3D artist · Model creator",
  heroTitle: "MICKEY",
  heroAccent: "SR",
  heroTagline: "Crafting 3D worlds,\none block at a time.",
  heroDescription: "Diseño modelos, armas y colecciones 3D que convierten una idea en una experiencia reconocible dentro de Minecraft.",
  projectsButtonLabel: "Ver proyectos",
  artstationButtonLabel: "Ver ArtStation",
  stats: [
    { value: "16", label: "Recursos" },
    { value: "102", label: "Compras" },
    { value: "589", label: "Descargas" },
  ],
  portfolioEyebrow: "Portafolio sincronizado",
  portfolioTitle: "Un archivo vivo.",
  portfolioAccent: "Se ordena solo.",
  portfolioDescription: "El panel privado y Sketchfab alimentan las galerías internas. Cuando publiques un proyecto o crees una categoría, el portafolio se actualizará automáticamente.",
  specialtiesEyebrow: "El trabajo detrás del resultado",
  specialtiesTitle: "Una dirección visual.",
  specialtiesAccent: "Cada detalle cuenta.",
  specialtiesDescription: "Del primer volumen a la presentación final, el objetivo es que cada pieza se sienta parte del mismo universo.",
  disciplines: [
    { icon: "◇", title: "Modelado voxel", text: "Siluetas claras y proporciones pensadas para el lenguaje visual de Minecraft." },
    { icon: "▦", title: "Texturas", text: "Paletas, materiales y detalles pintados píxel por píxel para dar identidad." },
    { icon: "✦", title: "Colecciones", text: "Armas, herramientas, armaduras y accesorios que funcionan como un sistema." },
    { icon: "▶", title: "Presentación 3D", text: "Escenas y previews que muestran cada recurso con claridad antes de llevarlo al juego." },
  ],
  aboutEyebrow: "Detrás de los píxeles",
  aboutTitle: "Diseño para que",
  aboutAccent: "cada mundo tenga identidad.",
  aboutParagraphs: [
    "Soy MickeySr, creador de modelos y contenido 3D para Minecraft. Trabajo colecciones completas en Blockbench: desde la forma y la textura hasta la presentación final de cada recurso.",
    "Mi estilo combina la claridad del pixel art con temas épicos, cósmicos y fantásticos. El resultado son piezas listas para destacar dentro del juego.",
  ],
  handle: "@Mickey_Sr",
  finalEyebrow: "MickeySr · 3D Model Creator",
  finalTitle: "Encuentra el próximo",
  finalAccent: "mundo de tu servidor.",
  finalDescription: "Explora el catálogo completo de modelos y colecciones para Minecraft.",
  finalButtonLabel: "Visitar tienda oficial",
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
