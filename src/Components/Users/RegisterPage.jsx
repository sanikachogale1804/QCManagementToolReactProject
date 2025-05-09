import React, { useState } from 'react';
import { register } from '../Services/UserService';
import '../CSS/RegisterPage.css'; 

const RegisterPage = () => {
  const [user, setUser] = useState({
    name: '',
    userEmail: '',
    userPassword: '',
    role: 'QC',
    loginHistory: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const savedUser = await register(user);
      setMessage('✅ Registration successful!');
      setUser({
        name: '',
        userEmail: '',
        userPassword: '',
        role: 'QC',
        loginHistory: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        {message && <div className="register-message">{message}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={user.userEmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={user.userPassword}
            onChange={handleChange}
            required
          />
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="QC">QC</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
