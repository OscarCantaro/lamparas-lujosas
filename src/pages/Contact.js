import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.black};
`;

const Contact = () => {
  return (
    <PageWrapper>
      <h1>Página de Contacto - En desarrollo</h1>
    </PageWrapper>
  );
};

export default Contact;