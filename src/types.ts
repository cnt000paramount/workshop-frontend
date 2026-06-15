// Modello prodotto, allineato allo schema del backend (Lab 1).
// Il Lab 4 chiede di esportare il tipo Product: è qui.
export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
}
