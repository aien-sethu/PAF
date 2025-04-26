package com.agriconnect.backend.service;

import com.agriconnect.backend.dto.CommentRequest;
import com.agriconnect.backend.dto.PostRequest;
import com.agriconnect.backend.model.Comment;
import com.agriconnect.backend.model.Post;
import com.agriconnect.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findByOrderByTimestampDesc();
    }

    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    public Post createPost(PostRequest postRequest, String author, String authorImage) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setImages(postRequest.getImages());
        post.setAuthor(author);
        post.setAuthorImage(authorImage != null ? authorImage : "/default-profile.png");
        post.setTimestamp(LocalDateTime.now());
        post.setLikes(0);
        post.setDislikes(0);
        post.setEdited(false);
        
        return postRepository.save(post);
    }

    public Optional<Post> updatePost(String id, PostRequest postRequest, String username) {
        return postRepository.findById(id)
            .filter(post -> post.getAuthor().equals(username))
            .map(post -> {
                post.setTitle(postRequest.getTitle());
                post.setContent(postRequest.getContent());
                post.setImages(postRequest.getImages());
                post.setEdited(true);
                post.setEditedAt(LocalDateTime.now());
                return postRepository.save(post);
            });
    }

    public boolean deletePost(String id, String username) {
        return postRepository.findById(id)
            .filter(post -> post.getAuthor().equals(username))
            .map(post -> {
                postRepository.delete(post);
                return true;
            })
            .orElse(false);
    }

    public Optional<Post> likePost(String id) {
        return postRepository.findById(id)
            .map(post -> {
                post.setLikes(post.getLikes() + 1);
                return postRepository.save(post);
            });
    }

    public Optional<Post> dislikePost(String id) {
        return postRepository.findById(id)
            .map(post -> {
                post.setDislikes(post.getDislikes() + 1);
                return postRepository.save(post);
            });
    }

    public Optional<Post> addComment(String postId, CommentRequest commentRequest, String author) {
        return postRepository.findById(postId)
            .map(post -> {
                Comment comment = new Comment();
                comment.setId(UUID.randomUUID().toString());
                comment.setText(commentRequest.getText());
                comment.setAuthor(author);
                comment.setTimestamp(LocalDateTime.now());
                comment.setEdited(false);
                
                post.getComments().add(comment);
                return postRepository.save(post);
            });
    }

    public Optional<Post> editComment(String postId, String commentId, CommentRequest commentRequest, String username) {
        return postRepository.findById(postId)
            .map(post -> {
                for (Comment comment : post.getComments()) {
                    if (comment.getId().equals(commentId) && comment.getAuthor().equals(username)) {
                        comment.setText(commentRequest.getText());
                        comment.setEdited(true);
                        comment.setEditedAt(LocalDateTime.now());
                        return postRepository.save(post);
                    }
                }
                return null;
            });
    }

    public Optional<Post> deleteComment(String postId, String commentId, String username) {
        return postRepository.findById(postId)
            .map(post -> {
                List<Comment> updatedComments = post.getComments().stream()
                    .filter(comment -> !(comment.getId().equals(commentId) && comment.getAuthor().equals(username)))
                    .toList();
                
                post.setComments(new ArrayList<>(updatedComments));
                return postRepository.save(post);
            });
    }
}