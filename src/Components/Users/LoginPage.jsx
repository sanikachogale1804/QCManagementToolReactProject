import React, { useState } from 'react';
import { login } from '../Services/UserService';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    userPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login function with the credentials
      const token = await login(credentials); // Expects name and password

      // If successful, save the token to localStorage
      localStorage.setItem('authToken', token); 

      // Display success message
      setMessage('✅ Login successful!');

      // Optionally, you can redirect the user after successful login
      // history.push('/dashboard'); // Use this if you are using react-router

    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed. Please check your name and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login with Name</h2>
        {message && <div className="login-message">{message}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={credentials.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={credentials.userPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
