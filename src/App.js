import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer'; // Lo crearemos en el siguiente paso
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

const AppWrapper = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif; // Fuente base
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App;