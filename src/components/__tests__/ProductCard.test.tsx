import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';
import type { Product } from '../../types';

// Test per ProductCard, sullo stesso modello di App.test.tsx (Vitest + React Testing Library).
const product: Product = {
  id: 1,
  name: 'Wireless Mouse',
  price: 29.99,
  category: 'electronics',
  imageUrl: 'https://example.com/mouse.png',
};

describe('ProductCard', () => {
  it('mostra nome, prezzo in EUR e categoria', () => {
    render(<ProductCard product={product} onAddToCart={vi.fn()} />);

    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    // toLocaleString usa uno spazio insecabile prima del simbolo €.
    expect(screen.getByText(/29,99\s*€/)).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('chiama onAddToCart con il prodotto al click sul bottone', () => {
    const onAddToCart = vi.fn();
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    fireEvent.click(screen.getByRole('button', { name: /aggiungi al carrello/i }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it('mostra il loading state finché l’immagine non è caricata', () => {
    render(<ProductCard product={product} onAddToCart={vi.fn()} />);

    // Inizialmente il placeholder di caricamento è visibile.
    expect(screen.getByText('Caricamento…')).toBeInTheDocument();

    // Dopo l'evento onLoad dell'immagine il placeholder sparisce.
    fireEvent.load(screen.getByRole('img', { name: 'Wireless Mouse' }));
    expect(screen.queryByText('Caricamento…')).not.toBeInTheDocument();
  });
});
