package com.devblog.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



public class UserDto {

	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public UserDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public UserDto(int id, String name, String email, String password, String about) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.about = about;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@NotEmpty(message = "Name can not be Empty.")
	@Size(min=4,message = "Name must be min of 4 characters.")
	private String name;
	@Email(message = "Email is invalid.")
	private String email;
	@Size(min=3,max=10,message = "Password must be min of 3  and max of 10 characters.")
	@NotEmpty(message = "Password can not be Empty.")
	private String password;
	@NotEmpty(message = "About can not be Empty.")
	private String about;

}
