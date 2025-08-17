import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

const ShopWrapper = styled.div`
  padding: 60px 40px;
  background-color: ${(props) => props.theme.colors.lightGray};

  @media (max-width: 1024px) {
    padding: 40px 30px;
  }

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ShopTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 36px;
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <ShopWrapper>
      <ShopTitle>Nuestra Colección de Lámparas</ShopTitle>
      <Grid
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
