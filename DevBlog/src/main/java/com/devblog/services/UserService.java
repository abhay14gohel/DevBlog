package com.devblog.services;

import java.util.List;

import com.devblog.payloads.UserDto;

public interface UserService {

	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer id);

	UserDto getUserById(Integer userId);

	List<UserDto> findAllUsers();

	void deleteUser(Integer id);

}