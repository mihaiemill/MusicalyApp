package com.musically.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test/auth")
public class TestController {

    @GetMapping
    @RequestMapping("/")
    public String testAuth() {
        return "HELLO";
    }
}
