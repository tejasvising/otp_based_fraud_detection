// src/ProductList.js
import React from 'react';
import styled from 'styled-components';
import Product from './Product';

const products = [
  { id: 1, name: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Product 2', price: 89.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Product 3', price: 79.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Product 4', price: 69.99, image: 'https://via.placeholder.com/300' },
  { id: 5, name: 'Product 5', price: 59.99, image: 'https://via.placeholder.com/300' },
  { id: 6, name: 'Product 6', price: 49.99, image: 'https://via.placeholder.com/300' },
  { id: 7, name: 'Product 7', price: 39.99, image: 'https://via.placeholder.com/300' },
  { id: 8, name: 'Product 8', price: 29.99, image: 'https://via.placeholder.com/300' },
  { id: 9, name: 'Product 9', price: 19.99, image: 'https://via.placeholder.com/300' },
];

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const ProductList = () => {
  return (
    <ProductGrid>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};

export default ProductList;
