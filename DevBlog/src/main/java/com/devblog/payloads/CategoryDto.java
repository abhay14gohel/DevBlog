package com.devblog.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CategoryDto {
	
	private int id;
	@NotBlank
	@Size(min=3,message = "Minimum length of Title should be 3.")
	private String categoryTitle;
	@NotBlank
	@Size(min=10,message = "Minimum length of Title should be 10.")
	private String categoryDescription;
	
	
		
}
