package com.musically.exception;

public class SongNotFoundException extends RuntimeException{
    public SongNotFoundException() {
        super("Song not found");
    }
}
