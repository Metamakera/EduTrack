// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ credentials, setCredentials, setError }) => {
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const mockAdminData = { username: 'admin', password: 'admin123' };
    if (
      credentials.username === mockAdminData.username &&
      credentials.password === mockAdminData.password
    ) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Admin credentials');
    }
  };

  return (
    <form onSubmit={handleLoginFormSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
