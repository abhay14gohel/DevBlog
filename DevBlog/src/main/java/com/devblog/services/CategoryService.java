package com.devblog.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devblog.payloads.CategoryDto;


public interface CategoryService {

//	create 
	public CategoryDto createCategory(CategoryDto categoryDto);

//	get
	public CategoryDto findCategory(Integer id);

//	update
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer id);

//	get all 
	public List<CategoryDto> getAllCategories();

//	delete
	public void deleteCategory(Integer id);

}
