package com.devblog.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserDto {

	private int id;
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
	@NotEmpty(message = "Please select Profile photo.")
	private String imgUrl;

}
