import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <section class="text-gray-600 body-font md:mx-32">
        <div class="container mx-auto flex px-5 py-2 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to DevBlog
              <br class="hidden lg:inline-block" />
            </h1>
            <p class="mb-8 leading-relaxed">
              Unlock the gateway to boundless creativity, where words dance,
              ideas soar, and connections flourish.
            </p>
            <div class="flex justify-center gap-5">
              <Button colorScheme="blue">
                <Link to="/signup">Get Started</Link>
              </Button>

              <Button
                onClick={() => {
                  navigate("/signin");
                }}
                colorScheme="gray"
              >
                Log In
              </Button>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6  ">
            <img
              class="object-cover object-center rounded w-full h-full"
              alt="hero"
              src="../../public/landing.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
