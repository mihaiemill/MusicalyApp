import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);

      // salvam datele in localStorage
      localStorage.setItem('token',response.data.token);

      navigate('/home');
    } catch (err) {
      console.error('Eroare:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Autentificare esuata');
      navigate('/home'); // doar temporar
    }
  };

  return (
    <div className="login-container">
      <div className="background-animation"></div>

      <form className="login-form fade-in-up" onSubmit={handleSubmit}>
        <h2>Login to Musicaly</h2>

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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '0.5rem' }}>
            {error}
          </p>
        )}

        <button type="submit">Login</button>

        <div className="register-redirect">
          <p>Don't have an account?</p>
          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
