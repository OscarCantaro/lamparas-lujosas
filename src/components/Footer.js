import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'; // Iconos de redes

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.darkGray};
  color: ${props => props.theme.colors.white};
  padding: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 10px 0;
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.mediumGray};
  font-size: 20px;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.white};
  }
`;

const WhatsAppInfo = styled.p`
  margin: 10px 0 0;
  color: ${props => props.theme.colors.lightGray};
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>&copy; 2025 Lámparas Elite. Todos los derechos reservados.</Copyright>
      <SocialLinks>
        <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </SocialIcon>
      </SocialLinks>
      <WhatsAppInfo>Contacto vía WhatsApp: +1234567890</WhatsAppInfo> {/* Reemplaza con tu número real */}
    </FooterWrapper>
  );
};

export default Footer;