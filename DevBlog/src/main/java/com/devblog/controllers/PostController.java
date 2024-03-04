package com.devblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devblog.entites.Category;
import com.devblog.payloads.ApiResponse;
import com.devblog.payloads.PostDto;
import com.devblog.payloads.PostResponse;
import com.devblog.services.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/post")
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("/user/{userId}/category/{categoryId}")
	public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto, @PathVariable Integer categoryId,
			@PathVariable Integer userId) {

		return new ResponseEntity<PostDto>(this.postService.createPost(postDto, userId, categoryId),
				HttpStatus.CREATED);
	}

	@GetMapping("")
	public ResponseEntity<PostResponse> getAllPost(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "postId", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		return new ResponseEntity<PostResponse>(this.postService.getAllPost(pageNumber, pageSize, sortBy, sortDir),
				HttpStatus.OK);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId) {

		return new ResponseEntity<PostDto>(this.postService.getPostById(postId), HttpStatus.OK);
	}

	@DeleteMapping("/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Integer postId) {
		this.postService.deletePost(postId);

		return new ResponseEntity<ApiResponse>(new ApiResponse("Post deleted successfully.", true), HttpStatus.OK);
	}

	@GetMapping("/category/{categoryId}")
	public ResponseEntity<PostResponse> getAllPostByCategory(@PathVariable Integer categoryId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "postId", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		return new ResponseEntity<PostResponse>(
				this.postService.getPostsByCategory(categoryId, pageNumber, pageSize, sortBy, sortDir),
				HttpStatus.OK);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<PostResponse> getAllPostByUser(@PathVariable Integer userId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = "postId", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		return new ResponseEntity<PostResponse>(this.postService.getPostsByUser(userId, pageNumber, pageSize,sortBy,sortDir),
				HttpStatus.OK);
	}

	@PutMapping("/{postId}")
	public ResponseEntity<PostDto> upadtePostById(@RequestBody PostDto postDto, @PathVariable Integer postId) {

		return new ResponseEntity<PostDto>(this.postService.updatePost(postDto, postId), HttpStatus.OK);
	}

	@GetMapping("/search/{keyWord}")
	public ResponseEntity<List<PostDto>> searchPost(@PathVariable String keyWord){
		
		List<PostDto> posts=this.postService.searchPost(keyWord);
		
		
		return new ResponseEntity<List<PostDto>>(posts,HttpStatus.OK);
	}
}
