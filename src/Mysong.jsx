import React, { useEffect, useState } from 'react';
import './Admin.css'; // reutilizăm designul
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';

export default function MySongs() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMySongs = async () => {
      try {
        const response = await axios.get('/songs/my-songs'); // endpoint care returneaza melodiile utilizatorului logat
        setSongs(response.data || []);
      } catch (err) {
        console.error('Eroare la încărcare melodii:', err.message);
        setError('Nu s-au putut încărca melodiile tale.');
      }
    };

    fetchMySongs();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return { color: '#00ff99', fontWeight: 'bold' };
      case 'REJECTED':
        return { color: '#ff4d4d', fontWeight: 'bold' };
      case 'PENDING':
      default:
        return { color: '#ffaa00', fontWeight: 'bold' };
    }
  };

  return (
    <div className="admin-container">
      <div className="background-animation" />

      <div className="addsong-header-logo">
        <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
      </div>

      <h2 className="admin-title">Melodiile trimise de tine</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className="admin-requests">
        {songs.map((song, index) => (
          <div className="admin-card" key={index}>
            <p><strong>Titlu:</strong> {song.title}</p>
            <p><strong>Artist:</strong> {song.artistName}</p>
            <p><strong>Data lansării:</strong> {song.dateOfRelease}</p>
            <p><strong>Versuri:</strong></p>
            <pre className="admin-lyrics">{song.lyrics}</pre>
            <p><strong>Status:</strong> <span style={getStatusStyle(song.status)}>{song.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
