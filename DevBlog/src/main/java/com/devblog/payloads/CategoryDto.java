package com.devblog.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryDto {
	
	private int id;
	@NotBlank
	@Size(min=3,message = "Minimum length of Title should be 3.")
	private String categoryTitle;
	@NotBlank
	@Size(min=10,message = "Minimum length of Title should be 10.")
	private String categoryDescription;
	
	
	public CategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CategoryDto(int id, String categoryTitle, String categoryDescription) {
		super();
		this.id = id;
		this.categoryTitle = categoryTitle;
		this.categoryDescription = categoryDescription;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCategoryTitle() {
		return categoryTitle;
	}
	public void setCategoryTitle(String categoryTitle) {
		this.categoryTitle = categoryTitle;
	}
	public String getCategoryDescription() {
		return categoryDescription;
	}
	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	
	
}
