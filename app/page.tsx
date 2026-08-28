"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import PortfolioArchive from "./PortfolioArchive";
import {
  bodyFontFamilies,
  defaultSiteSettings,
  headingFontFamilies,
  type SiteSettings,
} from "./site-defaults";

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CubeMark() {
  return (
    <span className="cube-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function BrandLogo({ logoUrl }: { logoUrl: string }) {
  return (
    <span className={`brand-logo${logoUrl ? " brand-logo--custom" : ""}`} aria-hidden="true">
      {logoUrl ? <img src={logoUrl} alt="" /> : (
        <svg viewBox="0 0 46 36">
          <polygon className="brand-logo__top" points="14,6 31,2 36,15 19,19" />
          <polygon className="brand-logo__left" points="14,6 19,19 12,32 3,19" />
          <polygon className="brand-logo__right" points="19,19 36,15 31,29 12,32" />
        </svg>
      )}
    </span>
  );
}

function Brand({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <BrandLogo logoUrl={settings.logoUrl} />
      <span>{settings.brandName}<span>{settings.brandAccent}</span></span>
    </>
  );
}

function Multiline({ children }: { children: string }) {
  const lines = children.split(/\r?\n/);
  return <>{lines.map((line, index): ReactNode => <span className="text-line" key={`${line}-${index}`}>{line}</span>)}</>;
}

function mergedSettings(incoming?: Partial<SiteSettings>): SiteSettings {
  if (!incoming) return defaultSiteSettings;
  return {
    ...defaultSiteSettings,
    ...incoming,
    stats: incoming.stats?.length ? incoming.stats : defaultSiteSettings.stats,
    disciplines: incoming.disciplines?.length ? incoming.disciplines : defaultSiteSettings.disciplines,
    aboutParagraphs: incoming.aboutParagraphs?.length ? incoming.aboutParagraphs : defaultSiteSettings.aboutParagraphs,
  };
}

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  const refreshSettings = useCallback(async () => {
    try {
      const response = await fetch(`/api/portfolio?settings=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json() as { settings?: Partial<SiteSettings> };
      setSettings(mergedSettings(payload.settings));
    } catch {
      // The complete default design remains available if a temporary sync fails.
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void refreshSettings(), 0);
    const interval = window.setInterval(() => void refreshSettings(), 60_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [refreshSettings]);

  const themeStyle = useMemo(() => ({
    "--night": settings.backgroundColor,
    "--night-soft": settings.backgroundColor,
    "--panel": settings.surfaceColor,
    "--panel-light": settings.surfaceColor,
    "--white": settings.textColor,
    "--muted": settings.mutedColor,
    "--cyan": settings.accentColor,
    "--cyan-bright": settings.accentBrightColor,
    "--display": headingFontFamilies[settings.headingFont] || headingFontFamilies[defaultSiteSettings.headingFont],
    "--sans": bodyFontFamilies[settings.bodyFont] || bodyFontFamilies[defaultSiteSettings.bodyFont],
  }) as ThemeStyle, [settings]);

  const bannerStyle = { "--hero-image": `url("${settings.bannerUrl}")` } as ThemeStyle;
  const socialLinks = [
    { href: settings.storeUrl, title: "BuiltByBit", subtitle: "Tienda oficial" },
    { href: settings.artstationUrl, title: "ArtStation", subtitle: "Portafolio visual" },
    { href: settings.sketchfabUrl, title: "Sketchfab", subtitle: "Modelos 3D" },
    { href: settings.youtubeUrl, title: "YouTube", subtitle: "Contenido" },
    { href: settings.tiktokUrl, title: "TikTok", subtitle: "Proceso creativo" },
  ].filter((link) => link.href);

  return (
    <main style={themeStyle}>
      <header className="site-header">
        <div className="header-shell">
          <a className="brand" href="#inicio" aria-label="MickeySr, inicio">
            <Brand settings={settings} />
          </a>

          <nav aria-label="Navegación principal">
            <a href="#trabajos">{settings.navPortfolio}</a>
            <a href="#especialidades">{settings.navSpecialties}</a>
            <a href="#sobre-mi">{settings.navAbout}</a>
          </nav>

          <a className="header-cta" href={settings.storeUrl} target="_blank" rel="noreferrer">
            {settings.storeButtonLabel} <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-banner" style={bannerStyle} role="img" aria-label="MickeySr creando modelos 3D en su estudio">
          <div className="hero-banner__grid" aria-hidden="true" />
          <span className="hero-status"><i /> {settings.heroStatus}</span>
        </div>

        <div className="hero-shell">
          <div className="hero-avatar">
            <img src={settings.avatarUrl} alt="Identidad visual pixel art de MickeySr" />
            <span aria-hidden="true">{settings.brandName.slice(0, 1) || "M"}</span>
          </div>

          <div className="hero-heading">
            <p className="eyebrow">{settings.heroEyebrow}</p>
            <h1>{settings.heroTitle}<span>{settings.heroAccent}</span></h1>
          </div>

          <div className="hero-intro">
            <p className="hero-tagline"><Multiline>{settings.heroTagline}</Multiline></p>
            <p>{settings.heroDescription}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#trabajos">{settings.projectsButtonLabel} <span>↓</span></a>
              <a className="button button--ghost" href={settings.artstationUrl} target="_blank" rel="noreferrer">{settings.artstationButtonLabel} <ArrowIcon /></a>
            </div>
          </div>

          <dl className="hero-stats" aria-label="Estadísticas de MickeySr">
            {settings.stats.map((stat, index) => <div key={`${stat.label}-${index}`}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}
          </dl>
        </div>
      </section>

      <div className="signature-strip" aria-hidden="true">
        <span>MODELS</span><i /> <span>WEAPONS</span><i /> <span>TEXTURES</span><i /> <span>ARMOR</span><i /> <span>MINECRAFT</span>
      </div>

      <section className="work section-shell" id="trabajos">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{settings.portfolioEyebrow}</p>
            <h2>{settings.portfolioTitle}<br /><span>{settings.portfolioAccent}</span></h2>
          </div>
          <p>{settings.portfolioDescription}</p>
        </div>

        <PortfolioArchive />
      </section>

      <section className="disciplines section-shell" id="especialidades">
        <div className="section-heading section-heading--services">
          <div>
            <p className="eyebrow">{settings.specialtiesEyebrow}</p>
            <h2>{settings.specialtiesTitle}<br /><span>{settings.specialtiesAccent}</span></h2>
          </div>
          <p>{settings.specialtiesDescription}</p>
        </div>

        <div className="discipline-grid">
          {settings.disciplines.map((discipline, index) => (
            <article key={`${discipline.title}-${index}`}>
              <span className="discipline-index">{String(index + 1).padStart(2, "0")}</span>
              <i>{discipline.icon}</i>
              <h3>{discipline.title}</h3>
              <p>{discipline.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="sobre-mi">
        <div className="section-shell about-layout">
          <div className="about-portrait">
            <img src={settings.avatarUrl} alt="Logo pixel art de MickeySr" />
            <span className="portrait-label">{settings.handle}</span>
            <span className="portrait-cube"><CubeMark /></span>
          </div>

          <div className="about-copy">
            <p className="eyebrow">{settings.aboutEyebrow}</p>
            <h2>{settings.aboutTitle}<br /><span>{settings.aboutAccent}</span></h2>
            {settings.aboutParagraphs.map((paragraph, index) => <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>)}

            <div className="social-links">
              {socialLinks.map((link) => (
                <a key={link.title} href={link.href} target="_blank" rel="noreferrer">
                  <span>{link.title}</span><small>{link.subtitle}</small><ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cube final-cube--one" aria-hidden="true" />
        <div className="final-cube final-cube--two" aria-hidden="true" />
        <p className="eyebrow">{settings.finalEyebrow}</p>
        <h2>{settings.finalTitle}<br /><span>{settings.finalAccent}</span></h2>
        <p>{settings.finalDescription}</p>
        <a className="button button--primary" href={settings.storeUrl} target="_blank" rel="noreferrer">{settings.finalButtonLabel} <ArrowIcon /></a>
      </section>

      <footer className="footer section-shell">
        <a className="brand" href="#inicio"><Brand settings={settings} /></a>
        <p>© 2026 MickeySr. Crafting 3D worlds, one block at a time.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  );
}
