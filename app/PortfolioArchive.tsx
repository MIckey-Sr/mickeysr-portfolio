"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SketchfabGallery from "./SketchfabGallery";

type PortfolioAsset = {
  id: string;
  type: string;
  imageUrl: string;
  title: string;
};

type PortfolioProject = {
  id: string;
  title: string;
  coverUrl: string;
  externalUrl: string;
  publishedAt: string;
  tags: string[];
  description: string;
  assets: PortfolioAsset[];
};

type PortfolioCategory = {
  id: string;
  title: string;
  position: number;
  description: string;
  projects: PortfolioProject[];
};

type PortfolioResponse = {
  source: "sanity" | "sample";
  sourceState: "connected" | "empty" | "unavailable";
  studioUrl: string;
  categories: PortfolioCategory[];
};

function formatDate(value: string) {
  if (!value) return "Sample content";
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

function ExternalBadge({ href, label }: { href: string; label: string }) {
  return (
    <a className="source-icon source-icon--web" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
      <span>WEB</span><b>↗</b>
    </a>
  );
}

export default function PortfolioArchive() {
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const portfolioRequest = useRef<AbortController | null>(null);

  const refreshPortfolio = useCallback(async () => {
    portfolioRequest.current?.abort();
    const controller = new AbortController();
    portfolioRequest.current = controller;
    setRefreshing(true);

    try {
      const response = await fetch(`/api/portfolio?refresh=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Portfolio request failed");
      setPortfolio((await response.json()) as PortfolioResponse);
      setFailed(false);
      setLastChecked(new Date());
    } catch (error) {
      if ((error as Error).name !== "AbortError") setFailed(true);
    } finally {
      if (!controller.signal.aborted) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void refreshPortfolio(), 0);
    const interval = window.setInterval(() => void refreshPortfolio(), 60_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      portfolioRequest.current?.abort();
    };
  }, [refreshPortfolio]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const categories = useMemo(() => portfolio?.categories ?? [], [portfolio]);
  const totalProjects = useMemo(() => categories.reduce((total, category) => total + category.projects.length, 0), [categories]);
  const connected = portfolio?.source === "sanity";
  const checkedLabel = lastChecked
    ? lastChecked.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })
    : "pending";

  return (
    <>
      <nav className="portfolio-index portfolio-index--dynamic" aria-label="Portfolio sources">
        <a href="#portfolio-gallery"><span>01</span><b>Visual Gallery</b><small>Private dashboard · automatic categories</small></a>
        <a href="#sketchfab-3d"><span>02</span><b>3D Models</b><small>Sketchfab · embedded viewer</small></a>
      </nav>

      <section className="portfolio-category" id="portfolio-gallery">
        <div className="category-heading">
          <div><span>01 / MICKEYSR PORTFOLIO</span><h3>Projects by category</h3></div>
          <p>{connected
            ? "The portfolio is managed from a private dashboard. Each new category automatically becomes its own section."
            : "The dashboard is connected. Publish your first project in Sanity to replace this sample content."}</p>
        </div>

        {!portfolio && !failed && (
          <div className="artstation-gallery-shell" aria-live="polite">
            <div className="live-gallery-status"><span><i /> Synchronizing portfolio</span><small>Checked every 60 seconds</small></div>
            <div className="sketchfab-loading">{Array.from({ length: 4 }).map((_, index) => <span key={index} />)}</div>
          </div>
        )}

        {failed && !portfolio && (
          <div className="sketchfab-error">
            <p>The portfolio could not be loaded right now.</p>
            <button type="button" onClick={() => void refreshPortfolio()}>Try again ↻</button>
          </div>
        )}

        {portfolio && (
          <div className="artstation-gallery-shell">
            <div className={`live-gallery-status${connected && !failed ? "" : " is-warning"}`} aria-live="polite">
              <span><i /> {failed
                ? "The latest check could not be completed"
                : connected
                  ? "Automatic synchronization with Sanity"
                  : portfolio.sourceState === "empty"
                    ? "Sanity connected · sample content"
                    : "Sample content · reconnecting to Sanity"}</span>
              <div className="gallery-sync-actions">
                <small>{categories.length} categories · {totalProjects} projects · checked {checkedLabel}</small>
                <a className="gallery-manage" href={portfolio.studioUrl} target="_blank" rel="noreferrer">Manage <b aria-hidden="true">↗</b></a>
                <button className="gallery-refresh" type="button" onClick={() => void refreshPortfolio()} disabled={refreshing}>
                  {refreshing ? "Checking…" : "Refresh"} <b aria-hidden="true">↻</b>
                </button>
              </div>
            </div>

            <div className="portfolio-category-sections">
              {categories.map((category, categoryIndex) => (
                <section className="portfolio-category-group" key={category.id} aria-labelledby={`portfolio-category-${category.id}`}>
                  <header className="portfolio-category-group__heading">
                    <div>
                      <span>{String(categoryIndex + 1).padStart(2, "0")} / CATEGORY</span>
                      <h4 id={`portfolio-category-${category.id}`}>{category.title}</h4>
                      {category.description && <p>{category.description}</p>}
                    </div>
                    <small>{category.projects.length} {category.projects.length === 1 ? "project" : "projects"}</small>
                  </header>

                  {category.projects.length ? (
                    <div className="portfolio-live-grid">
                      {category.projects.map((project, index) => (
                        <article className="portfolio-live-card" key={project.id}>
                          <button className="portfolio-live-card__main" type="button" onClick={() => setSelected(project)} aria-label={`View ${project.title} inside the portfolio`}>
                            <span className="portfolio-live-card__image">
                              {project.coverUrl && <img src={project.coverUrl} alt={`${project.title} project by MickeySr`} loading={categoryIndex > 0 || index > 3 ? "lazy" : "eager"} />}
                              <span className="portfolio-live-card__number">{String(index + 1).padStart(2, "0")}</span>
                              <span className="portfolio-live-card__view">VIEW HERE</span>
                            </span>
                            <span className="portfolio-live-card__copy">
                              <span className="portfolio-live-card__source">MICKEYSR · {category.title}</span>
                              <strong>{project.title}</strong>
                              <small>{formatDate(project.publishedAt)}</small>
                            </span>
                          </button>
                          {project.externalUrl && <ExternalBadge href={project.externalUrl} label={`Open external link for ${project.title}`} />}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="portfolio-category-empty">This category does not have any published projects yet.</div>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="portfolio-category" id="sketchfab-3d">
        <div className="category-heading">
          <div><span>02 / SKETCHFAB LIVE</span><h3>Interactive 3D models</h3></div>
          <p>Select any model to rotate and explore it without leaving the portfolio. The SF icon opens the original Sketchfab page.</p>
        </div>
        <SketchfabGallery />
      </section>

      {selected && (
        <div className="internal-viewer" role="dialog" aria-modal="true" aria-label={`${selected.title} project viewer`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}>
          <div className="internal-viewer__panel">
            <header className="internal-viewer__header">
              <div><span>MICKEYSR PROJECT</span><h3>{selected.title}</h3></div>
              <div className="internal-viewer__actions">
                {selected.externalUrl && <ExternalBadge href={selected.externalUrl} label="Open project external link" />}
                <button type="button" onClick={() => setSelected(null)} aria-label="Close viewer">×</button>
              </div>
            </header>
            <div className="internal-viewer__body">
              {selected.description && <p className="internal-viewer__description">{selected.description}</p>}
              {selected.assets.length ? (
                <div className="artstation-assets">
                  {selected.assets.map((asset) => <img key={asset.id} src={asset.imageUrl} alt={asset.title || selected.title} />)}
                </div>
              ) : selected.coverUrl ? (
                <div className="artstation-assets"><img src={selected.coverUrl} alt={selected.title} /></div>
              ) : (
                <div className="viewer-loading">This project does not have any published images yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
