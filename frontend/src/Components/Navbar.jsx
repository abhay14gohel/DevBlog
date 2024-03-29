import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { fetchUser, fetchUserSuccess } from "../State/User/userAction";
//  import {logo} from "../Linkssets/devblog_logo.png"
import { useDispatch, useSelector } from "react-redux";
import { initFlowbite } from "flowbite";
import {
  Popover,
  Avatar,
  Button,
  Center,
  Flex,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  WrapItem,
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

export const Navbar = () => {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(fetchUserSuccess(null));
    // navigate("/signup");
    // console.log("andsndnd");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="../../public/devblog.png"
            className="h-8 "
            alt="DevBlog Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <span className="text-[#007DFE] ">Dev</span>
            <span className="text-[#1B2E35] ">Blog</span>
          </span>
        </Link>
        {data && (
          <button
            onClick={() => {
              setOpen(!open);
            }}
            // data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            // aria-controls="navbar-default"
            // aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        )}

        {data && (
          <div
            className={`${open ? " " : " hidden"} w-full md:block md:w-auto`}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Popover isLazy>
                  <PopoverTrigger>
                    <div className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      {" "}
                      <WrapItem>
                        <Avatar
                          size="sm"
                          name={data?.name}
                          src={data?.imgUrl}
                        />{" "}
                      </WrapItem>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent width="" color="#007DFB" bgColor={"white"}>
                    <Center>
                      {" "}
                      <PopoverBody cursor={"default"}>
                        {" "}
                        <div className="flex flex-col gap-1 justify-center  text-md">
                          <Flex
                            alignItems="center"
                            justifyContent={"center"}
                            gap={2}
                          >
                            <span
                              className=""
                              onClick={() => {
                                // navigate("/editpost", { state: post });
                              }}
                            >
                              {data?.name}
                            </span>
                          </Flex>
                          <hr />
                          <Flex
                            alignItems="center"
                            justifyContent={"center"}
                            gap={2}
                            onClick={() => {
                              // handleDelete(post.postId);
                            }}
                          >
                            <span className="">{data?.email}</span>
                          </Flex>
                          <hr />
                          <Flex
                            alignItems="center"
                            gap={2}
                            justifyContent={"center"}
                            onClick={() => {
                              // handleDelete(post.postId);
                            }}
                          >
                            <span className="">{data?.about}</span>
                          </Flex>
                        </div>
                      </PopoverBody>
                    </Center>
                  </PopoverContent>
                </Popover>
              </li>
              <li>
                <Link
                  to="createpost"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Create Post
                </Link>
              </li>
              <li>
                <NavLink
                  to="/mypost"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  My Posts
                </NavLink>
              </li>

              <li>
                <button
                  // to="#"
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
