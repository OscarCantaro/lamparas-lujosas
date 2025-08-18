import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginWrapper = styled(motion.div)`
  padding: 60px 40px;
  background-color: ${(props) => props.theme.colors.lightGray};
  max-width: 500px;
  margin: 100px auto;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  text-align: center;

  @media (max-width: 600px) {
    padding: 30px 20px;
    margin: 50px auto;
  }
`;

const LoginTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 32px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 30px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const SubmitButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 15px 30px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;

const wrapperVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redirige a AdminPanel tras login exitoso
    } catch (err) {
      setError("Credenciales inválidas o error de autenticación");
      console.error("Error en login:", err);
    }
  };

  return (
    <LoginWrapper initial="hidden" animate="visible" variants={wrapperVariants}>
      <LoginTitle>Iniciar Sesión como Administrador</LoginTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton
          type="submit"
          whileHover="hover"
          variants={buttonVariants}
        >
          Iniciar Sesión
        </SubmitButton>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
