import React, { createContext, useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Load from localStorage or use initialProducts
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Persist to localStorage on products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]); // Auto-generate unique ID
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
