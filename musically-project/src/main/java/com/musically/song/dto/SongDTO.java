package com.musically.song.dto;

public class SongDTO {
    private String title;
    private String artistName;
    private String lyrics;
    private String dateOfRelease;

    public SongDTO(String title, String artistName, String lyrics, String dateOfRelease) {
        this.title = title;
        this.artistName = artistName;
        this.lyrics = lyrics;
        this.dateOfRelease = dateOfRelease;
    }

    public SongDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public String getDateOfRelease() {
        return dateOfRelease;
    }

    public void setDateOfRelease(String dateOfRelease) {
        this.dateOfRelease = dateOfRelease;
    }
}
