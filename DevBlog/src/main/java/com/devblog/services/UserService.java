package com.devblog.services;

import java.util.List;

import com.devblog.payloads.UserDto;
import com.devblog.payloads.UserLogin;

public interface UserService {

	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer id);

	UserDto getUserById(Integer userId);

	List<UserDto> findAllUsers();

	void deleteUser(Integer id);
	
	UserDto verifyUser(UserLogin userData);

}
