package com.devblog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devblog.entites.Category;
import com.devblog.entites.Post;
import com.devblog.entites.User;

public interface PostRepo extends JpaRepository<Post, Integer> {
	
//	List<Post>  findByUser(User user);
	Page<Post>  findByUser(User user,Pageable p);
	Page<Post>  findByCategory(Category category,Pageable p);

}
