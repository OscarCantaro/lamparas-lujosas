import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.black};
`;

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <PageWrapper>
      <h1>Detalle de Producto {id} - En desarrollo</h1>
    </PageWrapper>
  );
};

export default ProductDetail;