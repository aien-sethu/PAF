package com.agriconnect.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private String id;
    private String text;
    private String author;
    private LocalDateTime timestamp;
    private boolean edited;
    private LocalDateTime editedAt;
}