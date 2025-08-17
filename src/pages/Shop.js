import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.black};
`;

const Shop = () => {
  return (
    <PageWrapper>
      <h1>Página de Productos (Shop) - En desarrollo</h1>
    </PageWrapper>
  );
};

export default Shop;