package com.devblog.payloads;



public class ApiResponse {
	private String message;

	public ApiResponse(String message, boolean success) {
		super();
		this.message = message;
		this.success = success;
	}

	public ApiResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	private boolean success;

}