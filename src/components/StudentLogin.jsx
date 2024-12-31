// src/components/StudentLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = ({ credentials, setCredentials, setError }) => {
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentID: credentials.username, // studentID is passed as the username
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/student/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
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

export default StudentLogin;
