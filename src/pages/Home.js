import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  background-image: url('https://source.unsplash.com/random/1920x1080/?lamp,gray'); // Placeholder: lámpara en tonos grises
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // Overlay semi-transparente negro
  }

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  color: ${props => props.theme.colors.white};
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Home = () => {
  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Descubre la elegancia en iluminación</HeroTitle>
          <ExploreButton to="/shop">Explorar</ExploreButton>
        </HeroContent>
      </HeroSection>
      {/* Aquí irán más secciones en fases futuras */}
    </div>
  );
};

export default Home;