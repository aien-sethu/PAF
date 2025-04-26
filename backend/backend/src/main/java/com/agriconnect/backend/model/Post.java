package com.agriconnect.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String title;
    private String content;
    private List<String> images = new ArrayList<>();
    private String author;
    private String authorImage;
    private LocalDateTime timestamp;
    private int likes;
    private int dislikes;
    private List<Comment> comments = new ArrayList<>();
    private boolean edited;
    private LocalDateTime editedAt;
}