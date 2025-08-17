import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProductsProvider } from "./context/ProductsContext";

const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AdminPanel = React.lazy(() => import("./components/AdminPanel"));

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
`;

function App() {
  // Simple auth check for development
  const isAdminAccessible =
    process.env.NODE_ENV === "development" &&
    new URLSearchParams(window.location.search).get("pass") === "admin123";

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
                  element={
                    isAdminAccessible ? <AdminPanel /> : <Navigate to="/" />
                  }
                />
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
