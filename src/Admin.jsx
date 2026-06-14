import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from './axiosInstance';

export default function Admin() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/songs/status',{
          params:{status: "PENDING" }
        });
        setRequests(response.data || []);
      } catch (err) {
        console.error('Eroare la încărcare cereri:', err.message);
        setError('Nu s-au putut încărca cererile.');
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (index) => {
  const req = requests[index];
  try {
    await axios.put(`/songs/${req.id}/approve`);
    console.log('Acceptat:', req.title);
    setRequests((prev) => prev.filter((_, i) => i !== index));
  } catch (err) {
    console.error('Eroare la acceptare:', err.message);
  }
};


  const handleDeny = async (index) => {
    const req = requests[index];
    try {
      await axios.put(`/songs/${req.id}/reject`);
      console.log('Respins:', req.title);
      setRequests((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Eroare la respingere:', err.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="background-animation" />

      <div className="addsong-header-logo">
        <h1 className="logo-back" onClick={() => navigate('/home')}>Musicaly</h1>
      </div>

      <h2 className="admin-title">Cererile utilizatorilor pentru adăugare melodii</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className="admin-requests">
      {requests.map((req, index) => (
  <div className="admin-card" key={index}>
    <p><strong>User:</strong> {req.createdBy?.username || 'necunoscut'}</p>
    <p><strong>Titlu:</strong> {req.title}</p>
    <p><strong>Artist:</strong> {req.artistName}</p>
    <p><strong>Data lansării:</strong> {req.dateOfRelease}</p>
    <p><strong>Versuri:</strong></p>
    <pre className="admin-lyrics">{req.lyrics}</pre>

    <div className="admin-buttons">
      <button className="accept-btn" onClick={() => handleAccept(index)}>Acceptă</button>
      <button className="deny-btn" onClick={() => handleDeny(index)}>Respinge</button>
    </div>
  </div>
))}

      </div>
    </div>
  );
}
