import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Center,
  FormErrorMessage,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { fetchUser } from "../State/User/userAction";

export const SignUp = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    about: " ",
    password: "",
    imgUrl: "",
  });
  const dispatch = useDispatch();
  const [match, setMatch] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState({
    name: "",
    email: "",
    about: "",
    password: "",
    cpassword: "",
    imgUrl: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/");
    }
  }, []);

  const handelChange = (e) => {
    setuser((user) => {
      return {
        ...user,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFile(imageUrl);
    }
    let pics = file;
    setLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please select an Image.",
        status: "warning",
        duration: 2000,
        position: "bottom-left",
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatty");
      data.append("cloud_name", "ddao02zyw");

      fetch("https://api.cloudinary.com/v1_1/ddao02zyw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setuser((user) => {
            return {
              ...user,
              imgUrl: data.url.toString(),
            };
          });
          toast({
            title: "Image Uploaded.",
            description: "We've uploaded your Image.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user.cpassword != user.password) {
      setMatch("Confirm password and Password are not same");
      setLoading(false);
    }

    try {
      const { data } = await axios.post("/api/api/user/", user);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
      dispatch(fetchUser(data));
      window.location.reload()
      navigate("/");

      setLoading(false);
    } catch (error) {
      setErrors(error.response.data);

      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-gray-50 dark:bg-gray-900  pt-5 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>

              <form className="space-y-4 md:space-y-6 ">
                <div class="flex items-center justify-center w-full">
                  <label for="dropzone-file">
                    <WrapItem>
                      <Avatar
                        cursor={"pointer"}
                        size="lg"
                        name="Prosper Otemuyiwa"
                        src={
                          file ||
                          "https://res.cloudinary.com/ddao02zyw/image/upload/v1709668507/user_149071_q5h0on.png"
                        }
                      />{" "}
                    </WrapItem>
                    <input
                      accept="image/*"
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <Center>
                  <span className="text-red-400 text-sm">{errors.imgUrl}</span>
                </Center>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required=""
                    onChange={handelChange}
                  />
                </div>
                <span className="text-red-400 text-sm">{errors.name}</span>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handelChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <span className="text-red-400 text-sm">{errors.email}</span>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About you
                  </label>
                  <input
                    onChange={handelChange}
                    type="email"
                    name="about"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="tell something about you."
                    required=""
                  />
                </div>
                <span className="text-red-400 text-sm">{errors.about}</span>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handelChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <span className="text-red-400 text-sm">{errors.password}</span>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    onChange={handelChange}
                    type="confirm-password"
                    name="cpassword"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <span className="text-red-400 text-sm">{match}</span>

                <Button
                  colorScheme="blue"
                  variant="solid"
                  isLoading={loading}
                  onClick={(e) => {
                    handleSignUp(e);
                  }}
                >
                  Create an account
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
