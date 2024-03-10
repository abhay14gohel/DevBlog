package com.devblog.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devblog.entites.User;
import com.devblog.exception.InvalidDetailsException;
import com.devblog.exception.ResourceNotFoundException;
import com.devblog.exception.UserNotFoundException;
import com.devblog.payloads.UserDto;
import com.devblog.payloads.UserLogin;
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

		UserDto createdUserDto = convertToDto(createdUser);

		return createdUserDto;
	}

	@Override

	public UserDto updateUser(UserDto userDto, Integer id) {

		User userToUpdate = this.modelMapper.map(userDto, User.class);

		User existingUser = this.userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

		existingUser.setName(userToUpdate.getName());
		existingUser.setEmail(userToUpdate.getEmail());
		existingUser.setAbout(userToUpdate.getAbout());
		existingUser.setImgUrl(userToUpdate.getImgUrl());
		existingUser.setPassword(userToUpdate.getPassword());

		existingUser.setId(id);

		User updatedUser = this.userRepo.save(existingUser);

		UserDto updatedUserDto = convertToDto(updatedUser);

		return updatedUserDto;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		// TODO Auto-generated method stub

		User findUser = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		UserDto foundUser =convertToDto(findUser);

		return foundUser;
	}

	@Override
	public List<UserDto> findAllUsers() {
		// TODO Auto-generated method stub

		List<User> users = this.userRepo.findAll();

		List<UserDto> usersDtos = users.stream().map(user ->convertToDto(user))
				.collect(Collectors.toList());

		return usersDtos;
	}

	@Override
	public void deleteUser(Integer id) {
		// TODO Auto-generated method stub

		User user = this.userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		this.userRepo.delete(user);

	}

	@Override
	public UserDto verifyUser(UserLogin userData) {
		List<User> users = this.userRepo.findByEmail(userData.getEmail());

		Optional<User> optionalUser = users.stream().findFirst();

		User user = optionalUser.orElseThrow(() -> new UserNotFoundException("User", "email", userData.getEmail()));

		if (user.getPassword().equals(userData.getPassword())) {
			
			 modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		        modelMapper.typeMap(User.class, UserDto.class).addMappings(mapper -> mapper.skip(UserDto::setPassword));
			
			return convertToDto(user) ;
		} else {
			throw new InvalidDetailsException();
		}

	}
	
	private UserDto convertToDto(User user) {
        // Exclude password field from mapping
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.typeMap(User.class, UserDto.class).addMappings(mapper -> mapper.skip(UserDto::setPassword));
        return modelMapper.map(user, UserDto.class);
    }

}
