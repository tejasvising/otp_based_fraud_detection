// src/Product.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

const ProductCard = styled(animated.div)`
  width: 300px;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const ProductName = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  color: #007BFF;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #007BFF;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Product = ({ product }) => {
  const navigate = useNavigate();
  const animation = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleBuyNow = () => {
    navigate('/payment');
  };

  return (
    <ProductCard style={animation}>
      <ProductImage src={product.image} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      <BuyButton onClick={handleBuyNow}>Buy Now</BuyButton>
    </ProductCard>
  );
};

export default Product;
