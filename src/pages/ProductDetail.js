import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ProductsContext } from "../context/ProductsContext";

const DetailWrapper = styled(motion.div)`
  padding: 60px 40px;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.lightGray};

  @media (max-width: 1024px) {
    padding: 40px 30px;
    max-width: 700px;
  }

  @media (max-width: 600px) {
    padding: 30px 20px;
    max-width: 100%;
  }
`;

const ProductImage = styled(motion.img)`
  width: 500px;
  max-height: 500px;
  object-fit: cover;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    max-height: 400px;
  }

  @media (max-width: 600px) {
    max-height: 300px;
  }
`;

const ProductName = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: 32px;
  color: ${(props) => props.theme.colors.black};
  margin: 0 0 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const ProductDescription = styled(motion.p)`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 0 0 20px;
  text-align: center;
`;

const ProductPrice = styled(motion.p)`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: ${(props) => props.theme.colors.mediumGray};
  margin: 0 0 30px;
`;

const BuyButton = styled(motion.button)`
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
  const { products } = useContext(ProductsContext);
  const product = products.find((p) => p.id === id); // ID es string en Firestore

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const handleBuy = () => {
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
        variants={imageVariants}
      />

      <ProductName
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
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
        S/ {product.price.toFixed(2)}
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
