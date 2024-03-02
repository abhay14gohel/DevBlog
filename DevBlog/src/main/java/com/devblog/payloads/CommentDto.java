package com.devblog.payloads;

import com.devblog.entites.Post;
import com.devblog.entites.User;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@Data
@NoArgsConstructor

public class CommentDto {

	
	private int id;
	
	@NotEmpty(message = "Comment can not be empty.")
	private String content;
	
	private String  userName;
	private String  userImg;
	
	
	
	
}
