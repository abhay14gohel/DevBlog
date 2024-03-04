package com.devblog.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvalidDetailsException extends RuntimeException {
	
	public InvalidDetailsException() {
		super(String.format("Invalid details."));
	
	}

}
