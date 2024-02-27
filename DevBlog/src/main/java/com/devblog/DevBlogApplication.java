package com.devblog;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.devblog.entites.Category;
import com.devblog.payloads.PostDto;

@SpringBootApplication
public class DevBlogApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(DevBlogApplication.class, args);
		
		
	
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
