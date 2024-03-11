import {
  Button,
  Center,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { fetchUser } from "../State/User/userAction";
import LandingPage from "./LandingPage";
import { Link, NavLink } from "react-router-dom";

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(null);
  const toast = useToast();
  const [deleteId, setDeleteId] = useState(0);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`api/api/post/${id}`);

      toast({
        title: "Post deleted.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      setDeleteId(id);
    } catch (error) {
      toast({
        title: "Could not delete Post.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const fetchPosts = async () => {
    try {
      const { data: posts } = await axios.get(
        `api/api/post/user/${data?.id}?sortDir=desc`
      );
      // console.log(posts);
      // posts.content.reverse();
      setPosts(posts);
    } catch (error) {
      toast({
        title: "Could not load  Your Posts.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (data) {
      fetchPosts();
    }
  }, [data, deleteId]);

  return (
    <>
      {data ? (
        <>
          {" "}
          <div className="mx-10   md:mx-16  mt-2  grid grid-cols-1 md:grid-cols-3 gap-6 p-1 place-items-center ">
            {posts?.content?.map((post) => (
              <>
                <NavLink
                  to={`/post/${post.postId}`}
                  className="max-w-sm relative  rounded overflow-hidden shadow-lg  cursor-pointer md:w-[81%] w-full  bg-[#c8cbce]  "
                >
                  {" "}
                  <div
                    className=""
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    <Popover isLazy>
                      <PopoverTrigger>
                        <div
                          className="absolute bg-[#1B2E35] hover:text-[#1B2E35]  hover:bg-[#007DFE] p-1.5 rounded-[50%] right-2 ease-in-out duration-300 top-2 text-[#007DFE]  cursor-pointer"
                          onClick={(e) => {
                            // e.stopPropagation();
                            // e.preventDefault();
                          }}
                        >
                          <SlOptionsVertical />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        width=""
                        color="#C8CBCE"
                        bgColor={"#1B2E35"}
                      >
                        <Center>
                          {" "}
                          <PopoverBody>
                            {" "}
                            <div className="flex flex-col gap-1 justify-center  text-md">
                              <Flex
                                alignItems="center"
                                gap={2}
                                className=" hover:text-green-600"
                              >
                                <span
                                  className=""
                                  onClick={() => {
                                    navigate("/editpost", { state: post });
                                  }}
                                >
                                  <MdModeEditOutline />
                                </span>
                              </Flex>
                              <hr />
                              <Flex
                                alignItems="center"
                                gap={2}
                                className="hover:text-red-400"
                                onClick={() => {
                                  handleDelete(post.postId);
                                }}
                              >
                                <span className="">
                                  <MdDelete />
                                </span>
                              </Flex>
                            </div>
                          </PopoverBody>
                        </Center>
                      </PopoverContent>
                    </Popover>
                  </div>
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
                    <p className="text-[#1B2E35] text-base line-clamp-1">
                      {post.content}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{post.category.categoryTitle}
                    </span>
                  </div>
                </NavLink>
              </>
            ))}
          </div>
          {posts?.content?.length == 0 && (
            <div className="">
              <Center>You do not have any Post.</Center>
              <Center mt={2}>
                <NavLink to={"/createpost"}>
                  <Button colorScheme="blue">Create Post</Button>
                </NavLink>
              </Center>
            </div>
          )}
        </>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </>
  );
};

export default MyPosts;
