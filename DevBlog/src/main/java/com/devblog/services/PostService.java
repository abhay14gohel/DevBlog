package com.devblog.services;

import java.util.List;

import com.devblog.payloads.PostDto;
import com.devblog.payloads.PostResponse;

public interface PostService {
	
	

	PostDto  createPost(PostDto postDto ,Integer userId,Integer categoryId);
	PostDto updatePost(PostDto postDto,Integer postId);
	void deletePost(Integer postId);
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);
	PostDto getPostById(Integer postId);
	PostResponse getPostsByCategory(Integer categoryId,Integer pageNumber,Integer pageSize, String sortBy, String sortDir);
	PostResponse getPostsByUser(Integer userId,Integer pageNumber,Integer pageSize, String sortBy, String sortDir);
	List<PostDto> searchPost(String keyword);
	
	
	
	
}
