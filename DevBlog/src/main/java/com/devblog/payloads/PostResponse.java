package com.devblog.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {

	private List<PostDto> content;
	private boolean isLast;
	private int  totalPages;
	private long totalElements;
	private int  pageNuber;
	private int pageSize;
	
}
