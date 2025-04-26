package com.agriconnect.backend.repository;

import com.agriconnect.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByOrderByTimestampDesc();
    List<Post> findByAuthor(String author);
}