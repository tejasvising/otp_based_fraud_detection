
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import readData from './ReadLatestData';
import readLatestData from './ReadLatestData';

const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #e0e0e0;
`;

const Form = styled.form`
  width: 300px;
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
  border: 1px solid ${props => (props.error ? 'red' : '#ccc')};
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

const PinPage = () => {
  const [otpInput, setOtpInput] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber } = location.state || {};
  const [lat1, setLatitude] = useState('');
  const [long1, setLongitude] = useState('');
  const [lat2, setLatitude1] = useState('');
  const [long2, setLongitude2] = useState('');
  const [otp, setOtp] = useState('');
  const { state } = location;
  const getOtp = state ? state.otp : 'No OTP received';

  useEffect(() => {
    const fetchData = async () => {
      const dataFromFirebase = await readData();
      setLatitude1(dataFromFirebase.latitude);
      setLongitude2(dataFromFirebase.longitude);
    };
    const fetchOtp = async () => {
      const fetchedOtp = await readLatestData();
      setOtp(fetchedOtp);
    };
    fetchOtp();
    fetchData();
    fetchGeolocation();
  }, []);

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const distance = (lat1, lon1, lat2, lon2) => {
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const r = 6371;
    return c * r;
  };

  const validate = () => {
    const newErrors = {};
    if (!otpInput) newErrors.otpInput = 'OTP is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const dist = distance(lat1, long1, lat2, long2);
      const isSuccess = dist <= 1 && Number(otpInput) === Number(getOtp);
      console.log("Get OTP: ", getOtp)
      alert(`Fetched OTP: ${getOtp}\nEntered OTP: ${otpInput}\nDistance: ${dist.toFixed(2)} km`);
      navigate('/result', { state: { isSuccess, cardNumber } });
    }
  };

  return (
    <PinContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          error={errors.otpInput}
        />
        {errors.otpInput && <ErrorMessage>{errors.otpInput}</ErrorMessage>}
        <Button type="submit">Submit</Button>
      </Form>
    </PinContainer>
  );
};

export default PinPage;
