import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { products } from "../data/products";
import { motion } from "framer-motion"; // Nueva importación

const DetailWrapper = styled(motion.div)`
  // Convertido a motion.div
  padding: 40px 20px;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const ProductImage = styled(motion.img)`
  // Convertido a motion.img
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProductName = styled(motion.h1)`
  // Convertido a motion.h1
  font-family: "Playfair Display", serif;
  font-size: 32px;
  color: ${(props) => props.theme.colors.black};
  margin: 0 0 10px;
  text-align: center;
`;

const ProductDescription = styled(motion.p)`
  // Convertido a motion.p
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 0 0 20px;
  text-align: center;
`;

const ProductPrice = styled(motion.p)`
  // Convertido a motion.p
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: ${(props) => props.theme.colors.mediumGray};
  margin: 0 0 30px;
`;

const BuyButton = styled(motion.button)`
  // Convertido a motion.button
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 15px 30px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  cursor: pointer;
`;

const detailVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const textVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const handleBuy = () => {
    const message = `Hola, quiero comprar ${
      product.name
    } por $${product.price.toFixed(2)}`;
    const whatsappNumber = "+123456789";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <DetailWrapper
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={detailVariants}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={imageVariants} // Slide-in izquierda
      />
      <ProductName
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants} // Slide-in derecha
      >
        {product.name}
      </ProductName>
      <ProductDescription
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        {product.description}
      </ProductDescription>
      <ProductPrice
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        ${product.price.toFixed(2)}
      </ProductPrice>
      <BuyButton
        onClick={handleBuy}
        whileHover="hover"
        variants={buttonVariants}
      >
        Comprar
      </BuyButton>
    </DetailWrapper>
  );
};

export default ProductDetail;
