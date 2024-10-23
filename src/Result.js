// src/Result.js
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #e0e0e0;
`;

const Message = styled.h1`
  font-size: 2em;
  color: #343a40;
  margin-bottom: 20px;
`;

const Gif = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
`;

const Result = () => {
  const location = useLocation();
  const { isSuccess } = location.state;

  return (
    <ResultContainer>
      <Message>{isSuccess ? 'Payment Successful!' : 'Payment Failed!'}</Message>
      <Gif src={isSuccess ? '/success.gif' : '/failure.gif'} alt={isSuccess ? 'Success' : 'Failure'} />
    </ResultContainer>
  );
};

export default Result;
