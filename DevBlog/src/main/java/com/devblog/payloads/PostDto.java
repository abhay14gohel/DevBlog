package com.devblog.payloads;

import java.util.Date;

import com.devblog.entites.Category;
import com.devblog.entites.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class PostDto {
	
	private Integer postId;
	@NotEmpty(message = "Name can not be Empty.")
	@Size(min=4,message = "Name must be min of 4 characters.")
	
	private String title;
	@Size(max=100,min = 5 ,message =  "Content  must be min of 4 characters and max of 100 characters.")
	
	private String content;
	@NotEmpty(message = "Please Upload Image.")
	private String imageName;
	
	private Date addedDate;
	
	private UserDto user;
	
	private CategoryDto category;
	
}
