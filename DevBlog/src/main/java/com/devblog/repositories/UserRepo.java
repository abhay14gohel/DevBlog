package com.devblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devblog.entites.User;

public interface UserRepo extends JpaRepository<User, Integer> {

}
