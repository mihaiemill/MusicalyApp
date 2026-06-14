import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaUserCircle, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/auth/me');
        setUserName(response.data.username || '');
        setIsAdmin(response.data.isAdmin || false);
      } catch (err) {
        console.warn('Eroare la fetch user:', err.message);
        setError('Utilizator necunoscut');
      }
    };

    const fetchCards = async () => {
      try {
        const songsRes = await axios.get('/songs/all');
        const artistsRes = await axios.get('/artists/all');
        setSongs(songsRes.data || []);
        setArtists(artistsRes.data || []);
      } catch (err) {
        console.error('Eroare la încărcare date:', err.message);
      }
    };

    fetchCurrentUser();
    fetchCards();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get('/songs/search', {
        params: { query: searchQuery.trim() }
      });
      setSearchResults(response.data || []);
      console.log(response);
    } catch (err) {
      console.error('Eroare la căutare:', err.message);
      setSearchResults([]);
    }
  };

  return (
    <div className="home-container">
      <div className="background-animation" />

      <header className="home-header">
        <h1 className="logo">Musicaly</h1>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Caută melodii, artiști, versuri..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button-icon" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className="header-icons">
          <span style={{ color: '#00d4ff', fontSize: '1rem', marginRight: '1rem' }}>
            {userName ? `Salut, ${userName}` : error || '...'}
          </span>

          {isAdmin && (
            <FaUserShield
              className="admin-icon"
              onClick={() => navigate('/admin')}
              title="Admin"
            />
          )}

          <FaUserCircle
            className="profile-icon"
            onClick={() => navigate('/profile')}
            title="Profil"
          />
        </div>
      </header>

      <div className="card-container">
        {searchResults.length > 0 ? (
          searchResults.map((item, idx) => (
            <div
              className={`flash-card ${item.artistName ? 'song-card' : 'artist-card'}`}
              key={`result-${idx}`}
              onClick={() =>
                item.artistName
                  ? navigate(`/song/${item.id}`, { state: item })
                  : navigate(`/artist/${item.id}`, { state: item })
              }
              style={{ cursor: 'pointer' }}
            >
              <h4>{item.title ? `🎵 ${item.title}` : `🎤 ${item.name}`}</h4>
              <p>{item.artistName || item.genre || '---'}</p>
            </div>
          ))
        ) : (
          <>
            {songs.map((song, idx) => (
              <div
                className="flash-card song-card"
                key={`song-${idx}`}
                onClick={() => navigate(`/song/${song.id}`, { state: song })}
                style={{ cursor: 'pointer' }}
              >
                <h4>🎵 {song.title}</h4>
                <p>{song.artistName}</p>
              </div>
            ))}

            {artists.map((artist, idx) => (
              <div
                className="flash-card artist-card"
                key={`artist-${idx}`}
                onClick={() =>
                  navigate(`/artist/${encodeURIComponent(artist.name)}`, {
                    state: artist
                  })
                }
                style={{ cursor: 'pointer' }}
              >
                <h4>🎤 {artist.name}</h4>
                <p>{artist.genre || 'Gen necunoscut'}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
