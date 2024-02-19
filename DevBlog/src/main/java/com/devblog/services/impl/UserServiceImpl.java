package com.devblog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devblog.entites.User;
import com.devblog.exception.ResourceNotFoundException;
import com.devblog.payloads.UserDto;
import com.devblog.repositories.UserRepo;
import com.devblog.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDto createUser(UserDto userDto) {
		// TODO Auto-generated method stub
		
		User user = this.modelMapper.map(userDto, User.class);
		

		User createdUser = this.userRepo.save(user);

		UserDto createdUserDto = this.modelMapper.map(createdUser, UserDto.class);

		return createdUserDto;
	}

	@Override

	public UserDto updateUser(UserDto userDto, Integer id) {
	   
	    User userToUpdate = this.modelMapper.map(userDto, User.class);

	  
	    User existingUser = this.userRepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

	   
	    existingUser.setName(userToUpdate.getName());
	    existingUser.setEmail(userToUpdate.getEmail()); 
	  
	    existingUser.setId(id);

	    
	    User updatedUser = this.userRepo.save(existingUser);

	   
	    UserDto updatedUserDto = this.modelMapper.map(updatedUser, UserDto.class);

	    return updatedUserDto;
	}


	@Override
	public UserDto getUserById(Integer userId) {
		// TODO Auto-generated method stub

		User findUser = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		UserDto foundUser = this.modelMapper.map(findUser, UserDto.class);

		return foundUser;
	}

	@Override
	public List<UserDto> findAllUsers() {
		// TODO Auto-generated method stub

		List<User> users = this.userRepo.findAll();

		List<UserDto> usersDtos = users.stream().map(user -> this.modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());

		return usersDtos;
	}

	@Override
	public void deleteUser(Integer id) {
		// TODO Auto-generated method stub

		User user = this.userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		this.userRepo.delete(user);

	}

}
