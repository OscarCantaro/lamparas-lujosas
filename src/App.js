import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Contact = React.lazy(() => import("./pages/Contact"));

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif; // Fuente base
`;

function App() {
  return (
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App;
