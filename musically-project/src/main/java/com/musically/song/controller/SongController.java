package com.musically.song.controller;

import com.musically.song.dto.SongDTO;
import com.musically.song.model.Song;
import com.musically.song.model.SongStatus;
import com.musically.song.service.SongService;
import com.musically.user.model.User;
import com.musically.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;
    private final UserRepository userRepository;

    @Autowired
    public SongController(SongService songService, UserRepository userRepository) {
        this.songService = songService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> createSong(@RequestBody SongDTO songDTO, Authentication authentication) {
        String username = authentication.getName();

        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        songService.createPendingSong(songDTO, creator);

        return ResponseEntity.status(HttpStatus.CREATED).body("Song created and is pending approval");
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveSong(@PathVariable Long id) {
        songService.approveSong(id);
        return ResponseEntity.ok("Song approved");
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectSong(@PathVariable Long id) {
        songService.rejectSong(id);
        return ResponseEntity.ok("Song rejected");
    }

    @GetMapping("/status")
    public ResponseEntity<List<Song>> getSongsByStatus(@RequestParam SongStatus status) {
        List<Song> songs = songService.getSongsByStatus(status);
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Song>> searchSong(@RequestParam String query) {
        System.out.println("Query primit: " + query);

        String lowered = query.toLowerCase();

        List<Song> songs = songService.getSongsByStatus(SongStatus.APPROVED).stream() // TEMPORAR fără filtru
                .filter(song ->
                        song.getArtistName().toLowerCase().contains(lowered) ||
                                song.getTitle().toLowerCase().contains(lowered) ||
                                song.getLyrics().toLowerCase().contains(lowered))
                .toList();

        return ResponseEntity.ok(songs);
    }




    @GetMapping("/my-songs")
    public ResponseEntity<List<Song>> getMySongs(Authentication authentication) {
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Song> mySongs = songService.getSongsByCreator(user);
        return ResponseEntity.ok(mySongs);
    }

    @GetMapping("/by-artist")
    public ResponseEntity<List<Song>> getSongsByArtist(@RequestParam String name) {
        return ResponseEntity.ok(songService.getSongsByArtistName(name));
    }

}