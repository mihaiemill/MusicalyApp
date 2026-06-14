import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/users/create', form); 
      console.log('Înregistrare reușită:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Eroare:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Eroare necunoscută');
    }
  };

  return (
    <div className="register-container">
      <div className="background-animation"></div>

      <div className="register-left">
        <h1 className="fade-in">Welcome to Musicaly</h1>
        <p className="fade-in delay"></p>
        <div
          className="down-arrow"
          onClick={() => {
            const form = document.getElementById('register-form-section');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          &#x25BC;
        </div>
      </div>

      <div className="register-right" id="register-form-section">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create An Account</h2>

          <div className="form-row">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
              {error}
            </p>
          )}

          <button type="submit">Create Account</button>

          <div className="login-redirect">
            <p>Already have an account?</p>
            <button
              type="button"
              className="login-button"
              onClick={() => navigate('/')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
