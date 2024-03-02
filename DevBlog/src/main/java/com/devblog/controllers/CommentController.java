package com.devblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.devblog.payloads.ApiResponse;
import com.devblog.payloads.CommentDto;
import com.devblog.services.CommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/comment")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@PostMapping("/post/{postId}/user/{userId}")
	public ResponseEntity<CommentDto> createComment(@Valid @RequestBody CommentDto commentDto,
			@PathVariable Integer postId, @PathVariable Integer userId) {

		return new ResponseEntity<CommentDto>(this.commentService.createComment(commentDto, postId, userId),
				HttpStatus.CREATED);
	}

	@PutMapping("/{commentId}")
	public ResponseEntity<CommentDto> updateComment(@Valid @RequestBody CommentDto commentDto,
			@PathVariable Integer commentId) {

		return new ResponseEntity<CommentDto>(this.commentService.updateComment(commentDto, commentId),
				HttpStatus.ACCEPTED);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<List<CommentDto>> readComments(@PathVariable Integer postId) {

		return new ResponseEntity<List<CommentDto>>(this.commentService.readComments(postId),
				HttpStatus.OK);
	}
	
	@DeleteMapping("/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment(
			@PathVariable Integer commentId) {

		
		this.commentService.deleteComment( commentId);
		
		
		return new ResponseEntity<ApiResponse>(new ApiResponse("Comment deleted successfully.", true),
				HttpStatus.OK);
	}

}
