package com.musically.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.musically.song.model.Song;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private boolean isAdmin;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_songs",
            joinColumns = @JoinColumn(name = "creator_id"), // your custom column name for User ID
            inverseJoinColumns = @JoinColumn(name = "song_id") // column for Song ID
    )
    @JsonIgnore
    private Set<Song> favoriteSongs = new HashSet<>();

    public User() {
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public Set<Song> getFavoriteSongs() {
        return favoriteSongs;
    }

    public void addFavoriteSong(Song song) {
        this.favoriteSongs.add(song);
    }

    public void removeFavoriteSong(Song song) {
        this.favoriteSongs.remove(song);
    }
}