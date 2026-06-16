import type { Product } from "./types";

// Recupera i prodotti dall'API del Lab 1 (GET /api/products).
// La chiamata va a /api/... e Vite la inoltra al backend su :3000 (vedi proxy in vite.config.ts).
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products?page=1&limit=3");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Tollerante: il GET del Lab 1 può restituire un array oppure un envelope { items }.
  return Array.isArray(data) ? data : (data.items ?? []);
}
