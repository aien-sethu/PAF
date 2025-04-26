package com.agriconnect.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    @PostMapping("/context")
    public ResponseEntity<Map<String, String>> setUserContext(
            @RequestHeader("X-User-Name") String username,
            @RequestHeader(value = "X-User-Image", required = false) String userImage) {
        
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        if (userImage != null && !userImage.isEmpty()) {
            response.put("userImage", userImage);
        }
        
        return ResponseEntity.ok(response);
    }
}