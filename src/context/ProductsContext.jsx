import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Cargar productos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore usa strings como IDs
        ...doc.data(),
      }));
      setProducts(productsData);
    });

    // Limpieza del listener
    return () => unsubscribe();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: parseFloat(newProduct.price), // Asegura que price sea número
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const productRef = doc(db, "products", updatedProduct.id);
      await updateDoc(productRef, {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
