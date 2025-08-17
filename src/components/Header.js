import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa'; // Icono de carrito

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled(NavLink)`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  text-decoration: none;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavItem = styled(NavLink)`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s;

  &.active {
    color: ${props => props.theme.colors.mediumGray};
  }

  &:hover {
    color: ${props => props.theme.colors.lightGray};
  }
`;

const CartIcon = styled(FaShoppingCart)`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.lightGray};
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo to="/">Lámparas Elite</Logo>
      <NavMenu>
        <NavItem to="/" end>Home</NavItem>
        <NavItem to="/shop">Shop</NavItem>
        <NavItem to="/contact">Contacto</NavItem>
      </NavMenu>
      <CartIcon /> {/* Sin funcionalidad por ahora */}
    </HeaderWrapper>
  );
};

export default Header;