import { useState } from 'react';
import styles from './ProductCard.module.css';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// Formatta il prezzo in EUR con locale italiano (stesso schema di App.tsx).
function formatPrice(price: number): string {
  return price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Stato di caricamento dell'immagine: true finché l'immagine non è pronta (o fallisce).
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageLoading && <div className={styles.imagePlaceholder}>Caricamento…</div>}
        <img
          className={styles.image}
          src={product.imageUrl ?? 'https://placehold.co/200x200?text=Nessuna+immagine'}
          alt={product.name}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      <strong className={styles.name}>{product.name}</strong>
      <span className={styles.price}>{formatPrice(product.price)}</span>
      {product.category && <small className={styles.category}>{product.category}</small>}

      <button
        type="button"
        className={styles.addButton}
        onClick={() => onAddToCart(product)}
      >
        Aggiungi al carrello
      </button>
    </div>
  );
}
