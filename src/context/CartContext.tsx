import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: { name: string; hex: string; label: string };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string; label: string }, qty?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rooznameh-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('rooznameh-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  const addToCart = (product: Product, size: string, color: { name: string; hex: string; label: string }, qty = 1) => {
    if (product.status === 'ناموجود' || product.stock <= 0) return;
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color.name === color.name);
      if (existing) {
        const newQty = Math.min(existing.quantity + qty, product.stock);
        return prev.map(i => i === existing ? { ...i, quantity: newQty } : i);
      }
      const safeQty = Math.min(qty, product.stock);
      return [...prev, { product, quantity: safeQty, size, color }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.color.name === colorName)));
  };

  const updateQuantity = (productId: string, size: string, colorName: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setItems(prev => prev.map(i => {
      if (i.product.id === productId && i.size === size && i.color.name === colorName) {
        const capped = Math.min(qty, i.product.stock);
        return { ...i, quantity: capped };
      }
      return i;
    }));
  };

  const clearCart = () => setItems([]);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count, isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
