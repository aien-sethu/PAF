package com.agriconnect.backend.controller;

import com.agriconnect.backend.dto.CommentRequest;
import com.agriconnect.backend.dto.PostRequest;
import com.agriconnect.backend.model.Post;
import com.agriconnect.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return postService.getPostById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestBody PostRequest postRequest,
            @RequestHeader(value = "X-User-Name", required = false) String username,
            @RequestHeader(value = "X-User-Image", required = false) String userImage) {
        
        // Use a default username if not provided
        if (username == null || username.isEmpty()) {
            username = "Anonymous";
        }
        
        Post post = postService.createPost(postRequest, username, userImage);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable String id,
            @RequestBody PostRequest postRequest,
            @RequestHeader("X-User-Name") String username) {
        
        return postService.updatePost(id, postRequest, username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable String id,
            @RequestHeader("X-User-Name") String username) {
        
        boolean deleted = postService.deletePost(id, username);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Post> likePost(@PathVariable String id) {
        return postService.likePost(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<Post> dislikePost(@PathVariable String id) {
        return postService.dislikePost(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Post> addComment(
            @PathVariable String id,
            @RequestBody CommentRequest commentRequest,
            @RequestHeader("X-User-Name") String username) {
        
        return postService.addComment(id, commentRequest, username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Post> editComment(
            @PathVariable String postId,
            @PathVariable String commentId,
            @RequestBody CommentRequest commentRequest,
            @RequestHeader("X-User-Name") String username) {
        
        return postService.editComment(postId, commentId, commentRequest, username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Post> deleteComment(
            @PathVariable String postId,
            @PathVariable String commentId,
            @RequestBody CommentRequest commentRequest,
            @RequestHeader("X-User-Name") String username) {
        
        return postService.deleteComment(postId, commentId, username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}