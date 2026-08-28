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
  if (!value) return "Contenido de muestra";
  return new Intl.DateTimeFormat("es", { month: "short", year: "numeric" }).format(new Date(value));
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
    ? lastChecked.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })
    : "pendiente";

  return (
    <>
      <nav className="portfolio-index portfolio-index--dynamic" aria-label="Fuentes del portafolio">
        <a href="#portfolio-gallery"><span>01</span><b>Galería visual</b><small>Panel propio · categorías automáticas</small></a>
        <a href="#sketchfab-3d"><span>02</span><b>Modelos 3D</b><small>Sketchfab · visor interno</small></a>
      </nav>

      <section className="portfolio-category" id="portfolio-gallery">
        <div className="category-heading">
          <div><span>01 / MICKEYSR PORTFOLIO</span><h3>Proyectos por categoría</h3></div>
          <p>{connected
            ? "El portafolio se administra desde tu panel privado. Cada categoría nueva se convierte automáticamente en un apartado independiente."
            : "El panel ya está conectado. Publica tu primer proyecto en Sanity para reemplazar este contenido de muestra."}</p>
        </div>

        {!portfolio && !failed && (
          <div className="artstation-gallery-shell" aria-live="polite">
            <div className="live-gallery-status"><span><i /> Sincronizando el portafolio</span><small>Comprobación cada 60 segundos</small></div>
            <div className="sketchfab-loading">{Array.from({ length: 4 }).map((_, index) => <span key={index} />)}</div>
          </div>
        )}

        {failed && !portfolio && (
          <div className="sketchfab-error">
            <p>No se pudo cargar el portafolio en este momento.</p>
            <button type="button" onClick={() => void refreshPortfolio()}>Intentar nuevamente ↻</button>
          </div>
        )}

        {portfolio && (
          <div className="artstation-gallery-shell">
            <div className={`live-gallery-status${connected && !failed ? "" : " is-warning"}`} aria-live="polite">
              <span><i /> {failed
                ? "No se pudo completar la última revisión"
                : connected
                  ? "Sincronización automática con Sanity"
                  : portfolio.sourceState === "empty"
                    ? "Sanity conectado · contenido de muestra"
                    : "Contenido de muestra · reconectando Sanity"}</span>
              <div className="gallery-sync-actions">
                <small>{categories.length} categorías · {totalProjects} proyectos · revisión {checkedLabel}</small>
                <a className="gallery-manage" href={portfolio.studioUrl} target="_blank" rel="noreferrer">Administrar <b aria-hidden="true">↗</b></a>
                <button className="gallery-refresh" type="button" onClick={() => void refreshPortfolio()} disabled={refreshing}>
                  {refreshing ? "Comprobando…" : "Actualizar"} <b aria-hidden="true">↻</b>
                </button>
              </div>
            </div>

            <div className="portfolio-category-sections">
              {categories.map((category, categoryIndex) => (
                <section className="portfolio-category-group" key={category.id} aria-labelledby={`portfolio-category-${category.id}`}>
                  <header className="portfolio-category-group__heading">
                    <div>
                      <span>{String(categoryIndex + 1).padStart(2, "0")} / CATEGORÍA</span>
                      <h4 id={`portfolio-category-${category.id}`}>{category.title}</h4>
                      {category.description && <p>{category.description}</p>}
                    </div>
                    <small>{category.projects.length} {category.projects.length === 1 ? "proyecto" : "proyectos"}</small>
                  </header>

                  {category.projects.length ? (
                    <div className="portfolio-live-grid">
                      {category.projects.map((project, index) => (
                        <article className="portfolio-live-card" key={project.id}>
                          <button className="portfolio-live-card__main" type="button" onClick={() => setSelected(project)} aria-label={`Ver ${project.title} dentro del portafolio`}>
                            <span className="portfolio-live-card__image">
                              {project.coverUrl && <img src={project.coverUrl} alt={`Proyecto ${project.title} de MickeySr`} loading={categoryIndex > 0 || index > 3 ? "lazy" : "eager"} />}
                              <span className="portfolio-live-card__number">{String(index + 1).padStart(2, "0")}</span>
                              <span className="portfolio-live-card__view">VER AQUÍ</span>
                            </span>
                            <span className="portfolio-live-card__copy">
                              <span className="portfolio-live-card__source">MICKEYSR · {category.title}</span>
                              <strong>{project.title}</strong>
                              <small>{formatDate(project.publishedAt)}</small>
                            </span>
                          </button>
                          {project.externalUrl && <ExternalBadge href={project.externalUrl} label={`Abrir enlace externo de ${project.title}`} />}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="portfolio-category-empty">Esta categoría todavía no tiene proyectos publicados.</div>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="portfolio-category" id="sketchfab-3d">
        <div className="category-heading">
          <div><span>02 / SKETCHFAB LIVE</span><h3>Modelos 3D interactivos</h3></div>
          <p>Selecciona cualquier modelo para girarlo y explorarlo sin abandonar el portafolio. El icono SF abre su ficha original.</p>
        </div>
        <SketchfabGallery />
      </section>

      {selected && (
        <div className="internal-viewer" role="dialog" aria-modal="true" aria-label={`Visor del proyecto ${selected.title}`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}>
          <div className="internal-viewer__panel">
            <header className="internal-viewer__header">
              <div><span>MICKEYSR PROJECT</span><h3>{selected.title}</h3></div>
              <div className="internal-viewer__actions">
                {selected.externalUrl && <ExternalBadge href={selected.externalUrl} label="Abrir enlace externo del proyecto" />}
                <button type="button" onClick={() => setSelected(null)} aria-label="Cerrar visor">×</button>
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
                <div className="viewer-loading">Este proyecto todavía no tiene imágenes publicadas.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
