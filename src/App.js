// src/App.js
import React from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
`;

const AppHeader = styled.h1`
  font-size: 2.5em;
  color: #343a40;
  margin-bottom: 20px;
`;

const App = () => (
  <AppContainer>
    <AppHeader>Premium Products</AppHeader>
    <ProductList />
  </AppContainer>
);

export default App;
