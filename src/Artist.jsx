import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from './axiosInstance';
import './Artist.css';

export default function Artist() {
  const { id } = useParams(); // ex: "Deliric"
  const navigate = useNavigate();
  const location = useLocation();

  // normalizează numele artistului
  const rawArtist = location.state?.artist;
  const artistName = typeof rawArtist === 'string'
    ? rawArtist
    : rawArtist?.name || decodeURIComponent(id);

  const artist = {
    name: artistName,
    image: location.state?.image,
    genre: location.state?.genre,
    debut: location.state?.debut,
    description: location.state?.description
  };

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('/songs/by-artist', {
          params: { name: artist.name }
        });
        setSongs(response.data || []);
      } catch (err) {
        console.error('Eroare la melodiile artistului:', err.message);
        setError('Nu s-au găsit melodii.');
      }
    };

    fetchSongs();
  }, [artist.name]);

  return (
    <div className="artist-container">
      <div className="background-animation" />
      <div className="artist-header-logo">
        <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
      </div>

      <div className="artist-card">
        {artist.image && (
          <img src={artist.image} alt={artist.name} className="artist-avatar" />
        )}

        <h1 className="artist-name">{artist.name}</h1>

        {artist.genre && (
          <p className="artist-meta">{artist.genre} · Debut: {artist.debut}</p>
        )}

        {artist.description && (
          <p className="artist-description">{artist.description}</p>
        )}

        <h2 className="song-list-title">Melodii</h2>
        {error ? (
          <p style={{ color: '#ccc' }}>{error}</p>
        ) : (
          <div className="song-flashcards">
            {songs.map((song, index) => (
              <div
                key={index}
                className="flashcard"
                onClick={() => navigate(`/song/${song.id}`, { state: song })}
              >
                🎵 {song.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
