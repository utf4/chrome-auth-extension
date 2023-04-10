import React from 'react';
import './Popup.css';
import Login from '../Login/Login';
import SecretKey from '../SecretKey/SecretKey';
import Register from '../Register';
import RegenerateSecretKey from '../RegenerateSecretKey/RegrenerateSecretKey';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const Popup = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SecretKey />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regenerate" element={<RegenerateSecretKey />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default Popup;
