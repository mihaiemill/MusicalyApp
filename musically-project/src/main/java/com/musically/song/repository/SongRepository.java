package com.musically.song.repository;

import com.musically.song.model.Song;
import com.musically.song.model.SongStatus;
import com.musically.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByStatus(SongStatus status);
    List<Song> findByCreatedBy(User createdBy);
    List<Song> findByArtistNameIgnoreCase(String artistName);

}
