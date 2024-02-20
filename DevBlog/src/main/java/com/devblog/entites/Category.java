package com.devblog.entites;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@Column(name = "title", length = 100, nullable = false)
	private String categoryTitle;
	
	@Column(name = "description")
	private String categoryDescription;



	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(int id, String categoryTitle, String categoryDescription) {
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
