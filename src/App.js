import React, { Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { auth } from "./firebase"; // Nueva importación
import { onAuthStateChanged } from "firebase/auth";
import { ProductsProvider } from "./context/ProductsContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AdminPanel = React.lazy(() => import("./components/AdminPanel"));
const Login = React.lazy(() => import("./components/Login")); // Nueva lazy load para Login

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando autenticación...</div>;
  }

  return (
    <ProductsProvider>
      <Router>
        <AppWrapper>
          <Header />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/admin"
                  element={user ? <AdminPanel /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </AppWrapper>
      </Router>
    </ProductsProvider>
  );
}

export default App;
