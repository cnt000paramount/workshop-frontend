import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { fetchProducts } from './api';
import type { Product } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.app}>
      <h1>Catalogo Streaming</h1>

      {loading && <p>Caricamento…</p>}
      {error && (
        <p className={styles.error}>
          Errore: {error} — controlla che il backend giri su http://localhost:3000
          con <code>GET /api/products</code> implementato (Lab 1).
        </p>
      )}

      {/*
        TODO (Lab 4 · Parte B): crea src/components/ProductCard.tsx con Claude Code,
        poi SOSTITUISCI questa griglia "grezza" con:
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={...} />
            ))}
      */}
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <strong>{p.name}</strong>
            <span>{p.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</span>
            {p.category && <small>{p.category}</small>}
          </div>
        ))}
      </div>
    </main>
  );
}
