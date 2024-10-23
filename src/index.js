// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PaymentForm from './PaymentForm';
import PinPage from './PinPage';
import Result from './Result';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/pin" element={<PinPage />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </Router>
);
