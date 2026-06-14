package com.musically.song.service;

import com.musically.exception.SongNotFoundException;
import com.musically.song.dto.SongDTO;
import com.musically.song.model.Song;
import com.musically.song.model.SongStatus;
import com.musically.song.repository.SongRepository;
import com.musically.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {
    @Autowired
    private SongRepository songRepository;

    public List<Song> getSongsByCreator(User creator) {
        return songRepository.findByCreatedBy(creator);
    }
    public void createPendingSong(SongDTO dto, User creator) {
        Song song = new Song();
        song.setTitle(dto.getTitle());
        song.setArtistName(dto.getArtistName());
        song.setLyrics(dto.getLyrics());
        song.setDateOfRelease(dto.getDateOfRelease());
        song.setCreatedBy(creator);

        songRepository.save(song);
    }

    public void approveSong(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(SongNotFoundException::new);
        song.setStatus(SongStatus.APPROVED);
        songRepository.save(song);
    }

    public void rejectSong(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(SongNotFoundException::new);
        song.setStatus(SongStatus.REJECTED);
        songRepository.save(song);
    }

    public List<Song> getSongsByStatus(SongStatus status) {
        return songRepository.findByStatus(status);
    }

    public List<Song> getSongsByArtistName(String name) {
        return songRepository.findByArtistNameIgnoreCase(name);
    }
}
