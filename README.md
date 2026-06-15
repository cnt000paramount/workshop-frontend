# workshop-frontend

Frontend **React + TypeScript (Vite)** per il *Workshop AI — Modulo 2, Lab 4: Generare componenti React con Claude Code*.
Consuma l'API del backend `workshop-starter` (Lab 1) tramite proxy.

## Come si usa (due terminali)

**Terminale 1 — backend** (la cartella workshop-starter del Lab 1):
```bash
cd workshop-starter
npm install
npm run dev          # API su http://localhost:3000
```

**Terminale 2 — questo frontend:**
```bash
cd workshop-frontend
npm install
npm run dev          # UI su http://localhost:5173
```
Apri **http://localhost:5173**. Le chiamate a `/api/products` vengono inoltrate
automaticamente al backend su `:3000` (vedi `server.proxy` in `vite.config.ts`),
quindi non serve configurare CORS.

> ⚠️ Perché non `:3000`? Il backend occupa già la 3000. Il dev server di Vite sta sulla
> 5173 e fa da proxy verso la 3000: è il motivo della "nota porte" della Lab Guide.
> Requisito: nel Lab 1 devi aver implementato `GET /api/products`, altrimenti la pagina mostra un errore.

## Script
| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Avvia Vite su http://localhost:5173 |
| `npm run build` | Type-check (`tsc`) + build di produzione |
| `npm test` | Esegue i test (Vitest + React Testing Library) |

## Struttura
```
workshop-frontend/
├── index.html
├── vite.config.ts            proxy /api -> :3000 + config Vitest
├── src/
│   ├── main.tsx              entry React
│   ├── App.tsx               ⬅️ qui integrerai <ProductCard> (Lab 4 · Parte B)
│   ├── App.module.css        esempio di CSS Module (pattern per ProductCard.module.css)
│   ├── api.ts                fetchProducts() -> GET /api/products
│   ├── types.ts              tipo Product (id, name, price, category?, imageUrl?)
│   ├── test/setup.ts         setup jest-dom
│   └── App.test.tsx          test di esempio (modello per i test di ProductCard)
└── ...
```

## Cosa farai nel Lab 4
1. Con Claude Code genera **`src/components/ProductCard.tsx`**: props tipizzate (`product`, `onAddToCart`), prezzo in EUR, categoria, immagine placeholder, loading state, styling con `ProductCard.module.css`.
2. In `App.tsx` sostituisci la griglia "grezza" (vedi commento `TODO`) con `<ProductCard ... />`.
3. Genera gli unit test con **React Testing Library** (rendering, click su "Aggiungi al carrello", loading state).
4. Itera sul design chiedendo modifiche a Claude Code, poi committa.

`App.tsx` parte già funzionante e mostra i prodotti in una griglia minima: così vedi subito
i dati dell'API, e il tuo compito è "promuovere" quella griglia a un vero componente riutilizzabile.
