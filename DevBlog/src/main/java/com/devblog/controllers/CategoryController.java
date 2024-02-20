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
import org.springframework.web.bind.annotation.RestController;

import com.devblog.payloads.ApiResponse;
import com.devblog.payloads.CategoryDto;
import com.devblog.services.CategoryService;

import jakarta.validation.Valid;

@RequestMapping("/api/category")
@RestController
public class CategoryController {

	@Autowired
	private CategoryService catService;

//	create
	@PostMapping("/")
	ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto catDto) {

		return new ResponseEntity<CategoryDto>(this.catService.createCategory(catDto), HttpStatus.CREATED);

	}

//	update

	@PutMapping("/{catId}")
	ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto catDto, @PathVariable("catId") Integer catId) {

		return new ResponseEntity<CategoryDto>(this.catService.updateCategory(catDto, catId), HttpStatus.OK);

	}

//	delete
	@DeleteMapping("/{catId}")
	ResponseEntity<ApiResponse> deleteCategory(@PathVariable("catId") Integer catId) {

		this.catService.deleteCategory(catId);

		return new ResponseEntity<ApiResponse>(new ApiResponse("Category deleted successfully.", true), HttpStatus.OK);

	}

//	find
	@GetMapping("/{catId}")
	ResponseEntity<CategoryDto> findCategory(@PathVariable("catId") Integer catId) {

		return new ResponseEntity<CategoryDto>(this.catService.findCategory(catId), HttpStatus.OK);

	}

//	findAll

	@GetMapping("/")
	ResponseEntity<List<CategoryDto>> findCategory() {

		return new ResponseEntity<List<CategoryDto>>(this.catService.getAllCategories(), HttpStatus.OK);

	}

}
