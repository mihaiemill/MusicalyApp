import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/auth/me'); // ✅ endpointul tău
        setUsername(userRes.data.username || 'Utilizator');

        const favoritesRes = await axios.get('/songs/favorites'); // 🔁 endpointul tău pentru favorite
        setFavoriteSongs(favoritesRes.data || []);
      } catch (err) {
        console.error('Eroare la încărcare profil sau favorite:', err.message);
        setError('Nu s-au putut încărca datele.');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleAddSong = () => navigate('/addsong');
  const handleMySongs = () => navigate('/mysongs');
  const goToSong = (song) => navigate(`/song/${song.id}`, { state: song });
  const goBack = () => navigate('/home');

  return (
    <div className="profile-container">
      <div className="background-animation" />

      <div className="profile-header">
        <h1 className="profile-logo" onClick={goBack}>
          Musicaly
        </h1>
      </div>

      <div className="profile-card">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'absolute',
            top: '1rem',
            left: '1rem'
          }}
        >
          <button className="add-song-btn" onClick={handleAddSong}>
            Add song
          </button>
          <button className="add-song-btn" onClick={handleMySongs}>
            My songs
          </button>
        </div>

        {error ? (
          <p className="profile-error">{error}</p>
        ) : (
          <>
            <h1 className="profile-name">Salut, {username}!</h1>
            <p className="profile-subtitle">Melodiile tale favorite:</p>

            <div className="song-flashcards">
              {favoriteSongs.length > 0 ? (
                favoriteSongs.map((song, index) => (
                  <div
                    key={index}
                    className="flashcard"
                    onClick={() => goToSong(song)}
                  >
                    🎵 {song.title}
                  </div>
                ))
              ) : (
                <p style={{ color: '#ccc' }}>Nu ai nicio melodie salvată încă.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
