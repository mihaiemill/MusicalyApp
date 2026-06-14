package com.musically.user.service;

import com.musically.exception.SongNotFoundException;
import com.musically.exception.UserNotFoundException;
import com.musically.song.model.Song;
import com.musically.song.repository.SongRepository;
import com.musically.user.dto.UserDto;
import com.musically.exception.DuplicateUserException;
import com.musically.user.model.User;
import com.musically.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SongRepository songRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, SongRepository songRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.songRepository = songRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(final UserDto userDto) {
        if(userRepository.existsByEmail(userDto.getEmail())) {
            throw new DuplicateUserException("Provided email is already used !");
        }

        if(userRepository.existsByUsername(userDto.getUsername())) {
            throw new DuplicateUserException("Provided username is already used !");
        }

        storeNewUser(userDto);
    }

    private void storeNewUser(UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        User user = new User(userDto.getUsername(), userDto.getEmail(), encodedPassword);
        user.setAdmin(userDto.getIsAdmin());
        userRepository.save(user);
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public void addSongToFavorites(String username, Long songId) {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
        Song song = songRepository.findById(songId).orElseThrow();

        user.addFavoriteSong(song);
        userRepository.save(user);
    }

    public void removeSongFromFavorites(String username, Long songId) {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
        Song song = songRepository.findById(songId).orElseThrow(SongNotFoundException::new);

        user.removeFavoriteSong(song);
        userRepository.save(user);
    }

    public Set<Song> getFavoriteSongs(String userName) {
        return userRepository.findByUsername(userName).orElseThrow(UserNotFoundException::new).getFavoriteSongs();
    }

    public Boolean isFavoriteSong(String userName, Long songId) {
        return userRepository.findByUsername(userName).orElseThrow(UserNotFoundException::new).getFavoriteSongs().stream().anyMatch(song -> song.getId().equals(songId));
    }
}
