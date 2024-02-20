package com.devblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devblog.entites.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
