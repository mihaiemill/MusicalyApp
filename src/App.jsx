import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import Song from './Song';
import Artist from './Artist';
import AddSong from './Addsong';
import Admin from './Admin';
import Mysong from './Mysong'; // ✅ import adăugat

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mysongs" element={<Mysong />} /> {/* ✅ rută adăugată */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
