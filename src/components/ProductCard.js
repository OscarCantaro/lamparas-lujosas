import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const CardWrapper = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 20px;
  text-decoration: none;
  color: inherit;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 18px;
  color: ${(props) => props.theme.colors.black};
  margin: 10px 0 5px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.mediumGray};
  margin: 0 0 15px;
`;

const BuyButton = styled(motion.button)`
  // Convertido a motion.button para hover
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 10px 20px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

const ProductCard = React.memo(({ product }) => {
  const handleBuy = (e) => {
    e.preventDefault();
    const message = `Hola, quiero comprar ${
      product.name
    } por S/ ${product.price.toFixed(2)}`;
    const whatsappNumber = "+51967861327";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <CardWrapper
      to={`/product/${product.id}`}
      variants={cardVariants} // Variants para animación de aparición (usado en parent)
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Hover scale
    >
      <ProductImage src={product.image} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>S/ {product.price.toFixed(2)}</ProductPrice>
      <BuyButton
        onClick={handleBuy}
        whileHover="hover"
        variants={buttonVariants}
      >
        Comprar
      </BuyButton>
    </CardWrapper>
  );
});

export default ProductCard;
