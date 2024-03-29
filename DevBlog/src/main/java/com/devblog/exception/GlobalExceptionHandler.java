package com.devblog.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.devblog.payloads.ApiResponse;

@RestControllerAdvice	
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException e) {
		String message = e.getMessage();

		ApiResponse apiResponse = new ApiResponse(message, false);

		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ApiResponse> userNotFoundExceptionHandler(UserNotFoundException e) {
		String message = e.getMessage();

		ApiResponse apiResponse = new ApiResponse(message, false);

		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);

	}
	
	@ExceptionHandler(InvalidDetailsException.class)
	public ResponseEntity<ApiResponse> invalidDetailsExceptionHandler(InvalidDetailsException e) {
		String message = e.getMessage();

		ApiResponse apiResponse = new ApiResponse(message, false);

		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.UNAUTHORIZED);

	}
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
		Map<String,String> resp=new HashMap<>();
		
		ex.getBindingResult().getAllErrors().forEach((error)->{
			
			String fieldName=((FieldError)error).getField();
			String message=error.getDefaultMessage();
			
			resp.put(fieldName, message);
			
			
		});
		
		
		
		
		
		return new ResponseEntity<Map<String,String>>(resp,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ApiResponse> httpRequestMethodNotSupportedExceptionHandler(HttpRequestMethodNotSupportedException ex){
		String message = ex.getMessage();

		ApiResponse apiResponse = new ApiResponse(message, false);

		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.METHOD_NOT_ALLOWED);

	}

}
