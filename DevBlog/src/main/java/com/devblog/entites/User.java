package com.devblog.entites;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")

public class User {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	
	@Column(name = "user_name",nullable = false,length=100 )
	private String name;
//	@Column(unique = true)
	private String email;

	private String password;

	private String about;
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<Post> posts=new ArrayList<>();
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<Comment> comments=new ArrayList<>();
	
	private String imgUrl;

}
