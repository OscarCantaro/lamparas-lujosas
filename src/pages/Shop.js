import React from "react";
import styled from "styled-components";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion"; // Nueva importación

const ShopWrapper = styled.div`
  padding: 40px 20px;
  background-color: ${(props) => props.theme.colors.lightGray};
`;

const Grid = styled(motion.div)`
  // Convertido a motion.div
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ShopTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 36px;
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  margin-bottom: 40px;
`;

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Secuencial: cada child (card) aparece con 0.1s de delay
    },
  },
};

const Shop = () => {
  return (
    <ShopWrapper>
      <ShopTitle>Nuestra Colección de Lámparas</ShopTitle>
      <Grid
        initial="hidden"
        whileInView="visible" // Anima cuando entra en vista (lazy)
        viewport={{ once: true, amount: 0.2 }} // Solo una vez, cuando 20% visible
        variants={gridVariants}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </ShopWrapper>
  );
};

export default Shop;
