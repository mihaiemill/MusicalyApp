package com.musically.song.controller;

import com.musically.song.model.Song;
import com.musically.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/songs/favorites")
public class FavoriteSongsController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addFavorite(@RequestParam Long songId, Authentication authentication) {
        String username = authentication.getName();
        userService.addSongToFavorites(username, songId);
        return ResponseEntity.ok("Song added to favorites");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFavorite(@RequestParam Long songId, Authentication authentication) {
        String username = authentication.getName();
        userService.removeSongFromFavorites(username, songId);
        return ResponseEntity.ok("Song removed from favorites");
    }

    @GetMapping
    public ResponseEntity<Set<Song>> getFavorites(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getFavoriteSongs(username));
    }

    @GetMapping("/is-favorite")
    public ResponseEntity<Boolean> isFavoriteSong(@RequestParam Long songId, Authentication authentication) {
        return ResponseEntity.ok(userService.isFavoriteSong(authentication.getName(), songId));
    }
}