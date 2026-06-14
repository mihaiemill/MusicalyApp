import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from './axiosInstance'; // folosește axiosInstance cu token!
import './Song.css';

export default function Song() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [song, setSong] = useState(location.state || null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const artistName = song?.artist || song?.artistName || 'Artist necunoscut';

  // dacă nu avem song din state, îl cerem din backend
  useEffect(() => {
    if (!song) {
      const fetchSong = async () => {
        try {
          const response = await axios.get(`/song/${id}`);
          setSong(response.data);
        } catch (err) {
          console.error('Eroare la încărcarea melodiei:', err.message);
          setError('Melodia nu a fost găsită.');
        }
      };

      fetchSong();
    }
  }, [id, song]);

  // verificăm dacă este în favorite
  useEffect(() => {
    if (song?.id) {
      const checkFavorite = async () => {
        try {
          const response = await axios.get('/songs/favorites/is-favorite', {
            params: { songId: song.id }
          });
          setFavorite(response.data === true);
        } catch (err) {
          console.warn('Nu s-a putut verifica dacă e favorit:', err.message);
        }
      };

      checkFavorite();
    }
  }, [song?.id]);

  const toggleFavorite = async () => {
    const newState = !favorite;
    setFavorite(newState);

    try {
      if (newState) {
        await axios.post('/songs/favorites/add', null, {
          params: { songId: song.id }
        });
        console.log('Adăugat la favorite');
      } else {
        await axios.delete('/songs/favorites/remove', {
          params: { songId: song.id }
        });
        console.log('Șters din favorite');
      }
    } catch (err) {
      console.error('Eroare la modificarea favoritei:', err.message);
    }
  };

  if (error) {
    return (
      <div className="song-container">
        <div className="background-animation" />
        <div className="song-header-logo">
          <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
        </div>
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>{error}</h2>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="song-container">
        <div className="background-animation" />
        <div className="song-header-logo">
          <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
        </div>
        <h2 style={{ color: '#00d4ff', textAlign: 'center', marginTop: '4rem' }}>Se încarcă...</h2>
      </div>
    );
  }

  return (
    <div className="song-container">
      <div className="background-animation" />

      <div className="song-header-logo">
        <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
      </div>

      <div className="song-card">
        <button
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          title={favorite ? 'Șters din favorite' : 'Adăugat la favorite'}
        >
          ★
        </button>

        <div className="song-header">
          <img
            src={song.image}
            alt={artistName}
            className="artist-thumb"
            onClick={() =>
              navigate(`/artist/${encodeURIComponent(artistName)}`, {
                state: {
                  artist: artistName,
                  image: song.image
                }
              })
            }
            style={{ cursor: 'pointer' }}
          />
          <div>
            <h1 className="song-title">{song.title}</h1>
            <p className="song-meta">
              de{' '}
              <span
                className="artist-link"
                onClick={() =>
                  navigate(`/artist/${encodeURIComponent(artistName)}`, {
                    state: {
                      artist: artistName,
                      image: song.image
                    }
                  })
                }
              >
                {artistName}
              </span>{' '}
              · {song.releaseDate}
            </p>
          </div>
        </div>

        <div className="song-lyrics">
          {song.lyrics?.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
