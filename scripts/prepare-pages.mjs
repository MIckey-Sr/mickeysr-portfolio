import { access, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const client = resolve(root, "dist", "client");
const server = resolve(root, "dist", "server");
const serverEntry = resolve(server, "index.js");
const pages = resolve(root, "dist", "pages");
const pagesWorker = resolve(pages, "_worker.js");

await Promise.all([access(client), access(serverEntry)]);
await rm(pages, { recursive: true, force: true });
await mkdir(pages, { recursive: true });
await cp(client, pages, { recursive: true });
await cp(server, pagesWorker, { recursive: true });

console.log("Cloudflare Pages output ready: dist/pages");
