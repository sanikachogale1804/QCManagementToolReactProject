import React, { useState } from 'react';
import { login } from '../Services/UserService';
import '../CSS/LoginPage.css';
import logo from '../Image/logo.png'; // adjust the path as needed

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
            const token = await login(credentials);
            localStorage.setItem('authToken', token);
            setMessage('✅ Login successful!');
        } catch (err) {
            console.error(err);
            setMessage('❌ Login failed. Please check your name and password.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <img src={logo} alt="Logo" className="login-logo" />
                <h2>Login</h2>
                {message && <div className="login-message">{message}</div>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className='login-btn'>Login</button>
                </form>
            </div>

            <footer className="login-footer">
                All Rights Reserved Cogent Safety & Security
            </footer>
        </div>


    );
};

export default LoginPage;
