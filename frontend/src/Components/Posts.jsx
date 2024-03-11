import { Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUser } from "../State/User/userAction";
import LandingPage from "./LandingPage";
import { NavLink } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const toast = useToast();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/api/post?sortDir=desc");
      // data.content.reverse();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Could not load Posts.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (posts == null) {
      fetchPosts();
    }
  }, [posts]);

  return (
    <>
      {data ? (
        <>
          {" "}
          <div className="mx-10   md:mx-16  mt-2  grid grid-cols-1 md:grid-cols-3 gap-6 p-1 place-items-center ">
            {posts?.content?.map((post) => (
              <NavLink
                to={`/post/${post.postId}`}
                className="max-w-sm   rounded overflow-hidden cursor-pointer shadow-lg  md:w-[81%] w-full  bg-[#c8cbce] "
              >
                <div>
                  <img
                    className="w-full h-[12rem] object-cover"
                    src={
                      post.imageName ||
                      "https://res.cloudinary.com/ddao02zyw/image/upload/v1710067546/noimage_jyducu.jpg"
                    }
                    alt="title photo"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl text-[#007DFE] mb-2 line-clamp-1 capitalize">
                      {post.title}
                    </div>
                    <p className="text-[#1B2E35]text-base line-clamp-1">
                      {post.content}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{post.category.categoryTitle}
                    </span>
                  </div>
                  <figcaption className="flex items-center justify-start ml-5 mb-5">
                    <img
                      className="rounded-full object-fill w-9 h-9"
                      src={
                        post.user.imgUrl ||
                        "https://res.cloudinary.com/ddao02zyw/image/upload/v1709668507/user_149071_q5h0on.png"
                      }
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                      <div className="capitalize">{post.user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 ">
                        {post.user.about}
                      </div>
                    </div>
                  </figcaption>
                </div>
              </NavLink>
            ))}
          </div>
        </>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </>
  );
};

export default Posts;
