"use client";

import { Studio } from "sanity";
import config from "../../../sanity.config";

export default function StudioPage() {
  return (
    <main className="studio-shell">
      <Studio config={config} />
    </main>
  );
}
