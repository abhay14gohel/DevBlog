package com.devblog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devblog.entites.Category;
import com.devblog.exception.ResourceNotFoundException;
import com.devblog.payloads.CategoryDto;
import com.devblog.repositories.CategoryRepo;
import com.devblog.services.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private ModelMapper modelMapper;

	CategoryDto categoryToDto(Category category) {
		return modelMapper.map(category, CategoryDto.class);
	}

	Category dtoToCategory(CategoryDto categoryDto) {
		return modelMapper.map(categoryDto, Category.class);
	}

	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		// TODO Auto-generated method stub

		Category category = this.dtoToCategory(categoryDto);

		Category creartedCategory = this.categoryRepo.save(category);

		CategoryDto categoryDto2 = this.categoryToDto(creartedCategory);

		return categoryDto2;
	}

	@Override
	public CategoryDto findCategory(Integer id) {
		// TODO Auto-generated method stub
		
		Category cat = this.categoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
		
		
		return this.categoryToDto(cat);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer id) {
		// TODO Auto-generated method stub

		Category cat = this.categoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

		cat.setCategoryDescription(categoryDto.getCategoryDescription());
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setId(id);
		this.categoryRepo.save(cat);

		CategoryDto categoryDto2= this.categoryToDto(cat);
		return categoryDto2;
	}

	@Override
	public List<CategoryDto> getAllCategories() {
		// TODO Auto-generated method stub
		
		List<CategoryDto> allCats;
		
		allCats=this.categoryRepo.findAll().stream().map(cat->this.categoryToDto(cat)).collect(Collectors.toList());
		return allCats;
	}

	@Override
	public void deleteCategory(Integer id) {
		// TODO Auto-generated method stub
		Category cat = this.categoryRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
		this.categoryRepo.delete(cat);
		

	}

}
