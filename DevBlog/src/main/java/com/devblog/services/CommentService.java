package com.devblog.services;

import java.util.List;
import com.devblog.payloads.CommentDto;


public interface CommentService {

	 CommentDto createComment(CommentDto commentDto,Integer postId,Integer userId);
	CommentDto updateComment(CommentDto commentDto, Integer commentId);
	List<CommentDto>readComments(Integer postId);
	void deleteComment(Integer commentId);
	
	
}
