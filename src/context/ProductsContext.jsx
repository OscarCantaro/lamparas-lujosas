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
  const [error, setError] = useState(null);

  // Cargar productos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        try {
          const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
          setError(null);
        } catch (err) {
          console.error("Error en onSnapshot:", err);
          setError("No se pudieron cargar los productos");
        }
      },
      (err) => {
        console.error("Error en listener de Firestore:", err);
        setError(`Error de Firestore: ${err.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      setError(null);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setError(`No se pudo agregar el producto: ${error.message}`);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const productRef = doc(db, "products", updatedProduct.id);
      await updateDoc(productRef, {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
      });
      setError(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setError(`No se pudo actualizar el producto: ${error.message}`);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setError(null);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError(`No se pudo eliminar el producto: ${error.message}`);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
