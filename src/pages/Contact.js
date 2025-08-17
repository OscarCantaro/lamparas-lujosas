import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ContactWrapper = styled(motion.div)`
  padding: 60px 40px;
  background-color: ${(props) => props.theme.colors.lightGray};
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 40px 30px;
  }

  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const ContactTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 36px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.mediumGray};
  background-color: ${(props) => props.theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};

  &::placeholder {
    color: ${(props) => props.theme.colors.mediumGray};
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.mediumGray};
  background-color: ${(props) => props.theme.colors.white};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  height: 150px;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.mediumGray};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 15px 30px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
`;

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const wrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullMessage = `Hola, soy ${name} (${email}). Mensaje: ${message}`;
    const whatsappNumber = "+123456789"; // Placeholder
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
    window.open(url, "_blank");
    // Limpia formulario
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ContactWrapper
      initial="hidden"
      whileInView="visible"
      variants={wrapperVariants}
      viewport={{ once: true }}
    >
      <ContactTitle>Contáctanos</ContactTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextArea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <SubmitButton
          type="submit"
          whileHover="hover"
          variants={buttonVariants}
        >
          Enviar
        </SubmitButton>
      </Form>
    </ContactWrapper>
  );
};

export default Contact;
