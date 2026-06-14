import React, { useState } from 'react';
import './AddSong.css';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';

export default function AddSong() {
  const [form, setForm] = useState({
    title: '',
    artistName: '', // 🔁 schimbat aici
    dateOfRelease: '',
    lyrics: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('/songs', form);
      console.log('Melodie adăugată:', form);
      navigate('/home');
    } catch (err) {
      console.error('Eroare la salvare:', err.message);
      setError('Nu s-a putut trimite melodia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addsong-container">
      <div className="background-animation"></div>

      <div className="addsong-header-logo">
        <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
      </div>

      <form className="addsong-form" onSubmit={handleSubmit}>
        <h2>Adaugă o melodie nouă</h2>

        <label className="field-label">Nume melodie</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: Ambrozie"
          required
        />

        <label className="field-label">Artist</label>
        <input
          type="text"
          name="artistName" // 🔁 modificat
          value={form.artistName}
          onChange={handleChange}
          placeholder="Ex: Deliric"
          required
        />

        <label className="field-label">Data lansării</label>
        <input
          type="text"
          name="dateOfRelease"
          value={form.dateOfRelease}
          onChange={handleChange}
          placeholder="ZZ-LL-AAAA"
          required
        />

        <label className="field-label">Versuri</label>
        <textarea
          name="lyrics"
          value={form.lyrics}
          onChange={handleChange}
          placeholder="Introduceți versurile melodiei aici..."
          rows="8"
          required
        ></textarea>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
            {error}
          </p>
        )}

        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? <div className="small-spinner"></div> : 'Salvează melodia'}
          </button>
        </div>
      </form>
    </div>
  );
}
