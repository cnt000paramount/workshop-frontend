import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import App from './App';

// Test di ESEMPIO già funzionante: dimostra il setup Vitest + React Testing Library.
// Nel Lab 4 creerai src/components/__tests__/ProductCard.test.tsx sullo stesso modello.
describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Wireless Mouse', price: 29.99, category: 'electronics' }],
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('mostra il titolo e i prodotti caricati dall’API', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /catalogo/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Wireless Mouse')).toBeInTheDocument());
  });
});
