package com.devblog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devblog.entites.Category;
import com.devblog.entites.Comment;
import com.devblog.entites.Post;
import com.devblog.entites.User;
import com.devblog.exception.ResourceNotFoundException;
import com.devblog.payloads.CommentDto;
import com.devblog.repositories.CommentRepo;
import com.devblog.repositories.PostRepo;
import com.devblog.repositories.UserRepo;
import com.devblog.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CommentRepo commentRepo;

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserRepo userRepo;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId, Integer userId) {

		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		Comment comment = this.modelMapper.map(commentDto, Comment.class);

		comment.setPost(post);
		comment.setUser(user);

		this.commentRepo.save(comment);

		CommentDto com = this.modelMapper.map(comment, CommentDto.class);

		com.setUserImg(user.getImgUrl());
		com.setUserName(user.getName());

		return com;
	}

	@Override
	public CommentDto updateComment(CommentDto commentDto, Integer commentId) {

		Comment comment = this.commentRepo.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

		comment.setContent(commentDto.getContent());
		this.commentRepo.save(comment);

		return this.modelMapper.map(comment, CommentDto.class);
	}

	@Override
	public List<CommentDto> readComments(Integer postId) {
		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

		List<Comment> comments = this.commentRepo.findByPost(post);

		List<CommentDto> commentsDto = comments.stream().map((comment) -> {
			CommentDto commentDto = modelMapper.map(comment, CommentDto.class);
			commentDto.setUserImg(comment.getUser().getImgUrl());
			commentDto.setUserName(comment.getUser().getName());
			return commentDto;
		}).collect(Collectors.toList());

		return commentsDto;
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment comment = this.commentRepo.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));
		
		this.commentRepo.delete(comment);

	}

}
