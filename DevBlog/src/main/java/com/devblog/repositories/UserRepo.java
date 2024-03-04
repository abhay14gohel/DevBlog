package com.devblog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devblog.entites.User;
import java.util.List;


public interface UserRepo extends JpaRepository<User, Integer> {

	 List<User> findByEmail(String email);

}
