import { Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUser } from "../State/User/userAction";

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!data) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo) {
        dispatch(fetchUser(userInfo));
      } else {
        navigate("/signup");
      }
    } else {
      // window.location.reload();
    }
  }, [data]);
  

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
        <div className="max-w-sm   rounded overflow-hidden shadow-lg">
          <img className="w-full h-64" src={post.imgName} alt="title photo" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 line-clamp-1 capitalize">
              {post.title}
            </div>
            <p className="text-gray-700 text-base line-clamp-2">
              {post.content}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{post.category.categoryTitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
