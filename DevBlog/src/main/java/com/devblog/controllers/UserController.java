package com.devblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devblog.payloads.ApiResponse;
import com.devblog.payloads.UserDto;
import com.devblog.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

//	create user
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
		
		UserDto createdUser = this.userService.createUser(userDto);
		
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

//	upadate user

	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable("userId") Integer userId) {

		UserDto updatedUser = this.userService.updateUser(userDto, userId);

		return ResponseEntity.ok(updatedUser);

	}

//	delete user
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(
			@PathVariable("userId") Integer userId) {

		this.userService.deleteUser(userId);

		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted successfully.", true), HttpStatus.OK);

	}

//	get all users
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUser() {
		List<UserDto> users = this.userService.findAllUsers();

		return ResponseEntity.ok(users);
	}

//	find user
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> findUser(@PathVariable("userId") Integer userId) {

		return ResponseEntity.ok(this.userService.getUserById(userId));
	}

}
