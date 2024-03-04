package com.devblog.payloads;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserLogin {

	
	@NotEmpty(message = "Please enter email.")
	@Email(message = "Email is invalid.")
	private String email;
	@NotEmpty(message = "Please enter password.")
	private String password;
}
