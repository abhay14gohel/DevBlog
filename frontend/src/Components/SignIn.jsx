import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { fetchUser } from "../State/User/userAction";

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({ email: "", password: "" });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);

    if (!user.email || !user.password) {
      toast({
        title: "Please enter all fields.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/api/user/login", user);

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(fetchUser(data));
      toast({
        title: "Welcome back.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      window.location.reload();

      navigate("/");

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      // toast({
      //   title: "Login failed.",
      //   status: "error",
      //   duration: 4000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
      setLoading(false);
    }
  };

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

  return (
    <div>
      {" "}
      <div className="bg-gray-50 dark:bg-gray-900  pt-5 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In to Account
              </h1>

              <form className="space-y-4 md:space-y-6 ">
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
                <p className="text-red-400 text-sm">{error}</p>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  isLoading={loading}
                  onClick={(e) => {
                    // handleSignUp(e);
                    handleLogin();
                  }}
                >
                  Sign In
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do not have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
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

export default SignIn;
