"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SketchfabImage = {
  width: number;
  height: number;
  url: string;
};

type SketchfabModel = {
  uid: string;
  name: string;
  viewerUrl: string;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  thumbnails: { images: SketchfabImage[] };
  tags: { name: string; slug: string }[];
};

type SketchfabResponse = {
  next: string | null;
  results: SketchfabModel[];
};

const firstPage = "https://api.sketchfab.com/v3/models?user=mickeysr&sort_by=-publishedAt&count=24";

function thumbnailFor(model: SketchfabModel) {
  const images = [...model.thumbnails.images].sort((a, b) => b.width - a.width);
  return images.find((image) => image.width <= 1024)?.url ?? images[0]?.url;
}

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("es", { month: "short", year: "numeric" }).format(new Date(value));
}

export default function SketchfabGallery() {
  const [models, setModels] = useState<SketchfabModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<SketchfabModel | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const modelsRequest = useRef<AbortController | null>(null);

  const refreshModels = useCallback(async () => {
    modelsRequest.current?.abort();
    const controller = new AbortController();
    modelsRequest.current = controller;
    setRefreshing(true);

    try {
      let next: string | null = firstPage;
      let pages = 0;
      const loaded: SketchfabModel[] = [];

      while (next && pages < 10) {
        const response = await fetch(next, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Sketchfab request failed");
        const data = (await response.json()) as SketchfabResponse;
        loaded.push(...data.results);
        next = data.next;
        pages += 1;
      }

      setModels(loaded);
      setFailed(false);
      setLastChecked(new Date());
    } catch (error) {
      if ((error as Error).name !== "AbortError") setFailed(true);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void refreshModels(), 0);
    const interval = window.setInterval(() => void refreshModels(), 60_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      modelsRequest.current?.abort();
    };
  }, [refreshModels]);

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

  if (loading) {
    return (
      <div className="sketchfab-loading" aria-live="polite">
        {Array.from({ length: 6 }).map((_, index) => <span key={index} />)}
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="sketchfab-error">
        <p>No se pudo cargar la galería en este momento.</p>
        <a href="https://sketchfab.com/mickeysr/models" target="_blank" rel="noreferrer">Ver modelos en Sketchfab ↗</a>
      </div>
    );
  }

  return (
    <>
      <div className={`live-gallery-status${failed ? " is-warning" : ""}`} aria-live="polite">
        <span><i /> {failed ? "No se pudo completar la última revisión" : "Sincronización automática activa"}</span>
        <div className="gallery-sync-actions">
          <small>{models.length} modelos · última revisión {lastChecked ? lastChecked.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }) : "pendiente"}</small>
          <button className="gallery-refresh" type="button" onClick={() => void refreshModels()} disabled={refreshing}>
            {refreshing ? "Comprobando…" : "Actualizar ahora"} <b aria-hidden="true">↻</b>
          </button>
        </div>
      </div>

      <div className="sketchfab-grid">
        {models.map((model, index) => {
          const thumbnail = thumbnailFor(model);
          const visibleTags = model.tags.slice(0, 2);

          return (
            <article className="sketchfab-card" key={model.uid}>
              <button className="sketchfab-card__main" type="button" onClick={() => setSelected(model)} aria-label={`Explorar ${model.name} en 3D dentro del portafolio`}>
                <span className="sketchfab-card__image">
                  {thumbnail && <img src={thumbnail} alt={`Modelo 3D ${model.name} de MickeySr`} loading={index > 5 ? "lazy" : "eager"} />}
                  <span className="sketchfab-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="sketchfab-card__view">EXPLORAR 3D</span>
                </span>
                <span className="sketchfab-card__copy">
                  <span className="sketchfab-tags">
                    {visibleTags.map((tag) => <span key={tag.slug}>{tag.name}</span>)}
                  </span>
                  <strong>{model.name}</strong>
                  <span className="sketchfab-card__meta">
                    <span>{formattedDate(model.publishedAt)}</span>
                    <span>{model.viewCount} vistas</span>
                    <span>{model.likeCount} likes</span>
                  </span>
                </span>
              </button>
              <a className="source-icon source-icon--sf" href={model.viewerUrl} target="_blank" rel="noreferrer" aria-label={`Abrir ${model.name} en Sketchfab`} title="Abrir en Sketchfab">
                <span>SF</span><b>↗</b>
              </a>
            </article>
          );
        })}
      </div>

      {selected && (
        <div className="internal-viewer internal-viewer--sketchfab" role="dialog" aria-modal="true" aria-label={`Visor 3D de ${selected.name}`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}>
          <div className="internal-viewer__panel">
            <header className="internal-viewer__header">
              <div><span>SKETCHFAB · INTERACTIVE 3D</span><h3>{selected.name}</h3></div>
              <div className="internal-viewer__actions">
                <a className="source-icon source-icon--sf" href={selected.viewerUrl} target="_blank" rel="noreferrer" aria-label="Abrir modelo original en Sketchfab"><span>SF</span><b>↗</b></a>
                <button type="button" onClick={() => setSelected(null)} aria-label="Cerrar visor 3D">×</button>
              </div>
            </header>
            <div className="sketchfab-embed">
              <iframe
                src={`https://sketchfab.com/models/${selected.uid}/embed?autostart=1&ui_theme=dark`}
                title={`Modelo 3D ${selected.name}`}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
