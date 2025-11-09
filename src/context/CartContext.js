"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pharmaceutical-cart";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore JSON errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!isHydrated) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, isHydrated]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => String(item.id) === String(product.id));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => String(item.id) !== String(productId));
      }
      return prev.map((item) =>
        String(item.id) === String(productId) ? { ...item, quantity } : item
      );
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const clearCart = () => setItems([]);

  const cartCount = useMemo(() => items.length, [items]);

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + (item.quantity ?? 0), 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      totalQuantity,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
      isHydrated,
    }),
    [items, cartCount, subtotal, totalQuantity, isHydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};


