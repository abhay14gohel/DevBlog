package com.devblog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devblog.entites.Comment;
import com.devblog.entites.Post;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

	List<Comment>findByPost(Post post);
	
}
