import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import storeData from './StoreData';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #e0e0e0;
`;

const Card = styled.div`
  width: 400px;
  height: 250px;
  background: linear-gradient(135deg, #9b4dca, #d16ba5);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #5ea3ff, #65dfc9);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;

  &:hover {
    background: linear-gradient(135deg, #3e85ff, #3acb91);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [newOtp, setOtp] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!cardHolder) newErrors.cardHolder = 'Card holder is required';
    if (!expirationDate) newErrors.expirationDate = 'Expiration date is required';
    if (!ccv) newErrors.ccv = 'CCV is required';
    return newErrors;
  };

  const generateOTP = () => {
    // Generate a random number between 1000 and 9999
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOtp(otp);
    return otp;
  };

  const handleStoreOtp = (otp) => {
    storeData(otp);
  };

  const sendMessage = async (message) => {
    try {
      const otp = generateOTP();
      message = message + "****** LINK";
      const response = await axios.post('http://localhost:8000/send-message', {
        phoneNumber: '+91**********',
        message,
      });
      handleStoreOtp(otp);
      // alert('Message sent successfully!' + otp);
      navigate('/pin', { state: { otp } });
    } catch (error) {
      if (error.response) {
        console.error('Error sending message:', error.response.data);
        alert(`Failed to send message: ${error.response.data.error}`);
      } else {
        console.error('Error sending message:', error.message);
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      sendMessage('Hi');
    }
  };

  return (
    <FormContainer>
      <Card />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          error={errors.cardNumber}
        />
        {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Card Holder"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          error={errors.cardHolder}
        />
        {errors.cardHolder && <ErrorMessage>{errors.cardHolder}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          error={errors.expirationDate}
        />
        {errors.expirationDate && <ErrorMessage>{errors.expirationDate}</ErrorMessage>}
        <Input
          type="text"
          placeholder="CCV"
          value={ccv}
          onChange={(e) => setCcv(e.target.value)}
          error={errors.ccv}
        />
        {errors.ccv && <ErrorMessage>{errors.ccv}</ErrorMessage>}
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentForm;