import { Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const toast = useToast();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/api/post");
      setPosts(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (posts == null) {
      fetchPosts();
    }
  }, [posts]);

  return (
    <div className="mx-10  md:mx-32  mt-2  grid grid-cols-1 md:grid-cols-3 gap-3 p-1 place-items-center ">
      {posts?.content?.map((post) => (
        <div class="max-w-sm   rounded overflow-hidden shadow-lg">
          <img
            class="w-full h-64"
            src={post.imgName}
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 line-clamp-1 capitalize">
              {post.title}
            </div>
            <p class="text-gray-700 text-base line-clamp-2">{post.content}</p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{post.category.categoryTitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
