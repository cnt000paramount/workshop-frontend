import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { fetchProducts } from './api';
import ProductCard from './components/ProductCard';
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

  function handleAddToCart(product: Product) {
    // Placeholder: per il Lab basta dimostrare il flusso del callback.
    console.log('Aggiunto al carrello:', product.name);
  }

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

      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </main>
  );
}
