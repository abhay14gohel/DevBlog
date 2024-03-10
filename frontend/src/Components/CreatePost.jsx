import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LandingPage from "./LandingPage";

export const CreatePost = () => {
  const { data: user } = useSelector((state) => state.user);
  const [category, setCategory] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState({
    title: "",
    content: "",
    catId: 0,
    imageName: null,
  });

  const [errors, setErrors] = useState({
    title: null,
    content: null,
    catId: null,
    imageName: null,
  });

  const findCategory = async () => {
    try {
      const { data } = await axios.get("/api/api/category/");
      setCategory(data);
    } catch (error) {
      toast({
        title: "Could not load Categories",

        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    setPost({ ...post, catId: selectedCategoryId });
  };

  const handleChange = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
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
          setPost((post) => {
            return {
              ...post,
              imageName: data.url.toString(),
            };
          });
          toast({
            title: "Image Uploaded.",
            // description: "We've uploaded your Image.",
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
        title: "Please Select an Post img",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const createPost = async () => {
    try {
      if (post.catId == 0) {
        toast({
          title: "Please select category.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
        return;
      }
      const { data } = await axios.post(
        `api/api/post/user/${user.id}/category/${post.catId}`,
        {
          title: post.title,
          content: post.content,
          imageName: post.imageName
            ? post.imageName
            : "https://res.cloudinary.com/ddao02zyw/image/upload/v1710067546/noimage_jyducu.jpg",
        }
      );

      toast({
        title: "Post created.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      navigate("/mypost");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    // }
    findCategory();
  }, [user]);

  return (
    <>
      {user ? (
        <div className="md:mx-64   bg-gray-100  mx-2 py-5 rounded-lg  ">
          <Tooltip label="Upload Post Image">
            <div className="flex flex-col md:flex-row  justify-around items-center my-2    ">
              <div class="flex items-center justify-center ">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-72 h-40 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center ">
                    <img
                      className={` w-72 h-40 rounded-lg object-${
                        post.imageName ? "fill " : "cover "
                      } ${loading ? " cursor-no-drop " : " cursor-pointer "}`}
                      src={post.imageName || "../../public/ok.jpg"}
                      alt="Click Here to upload Post Image"
                    />
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    disabled={loading}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </Tooltip>
          <form class="max-w-sm mx-auto mt-4">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-[#007DFE]"
            >
              Select an Category
            </label>
            <select
              id="countries"
              onChange={handleCategoryChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value={0}>
                Choose a Category
              </option>

              {category &&
                category.map((cat) => (
                  <option value={cat.id}> {cat.categoryTitle}</option>
                ))}
            </select>
          </form>

          <FormControl isInvalid={errors.title} p={5}>
            <FormLabel color={"#007DFE"}>Title:</FormLabel>
            {!errors.title ? (
              <FormHelperText>Write title of your post.</FormHelperText>
            ) : (
              <FormErrorMessage> {errors.title}</FormErrorMessage>
            )}
            <Input mt={2} onChange={handleChange} name="title" type="text" />
          </FormControl>

          <FormControl isInvalid={errors.content} p={5}>
            <FormLabel color={"#007DFE"}>Content:</FormLabel>
            {!errors.content ? (
              <FormHelperText>
                Write content realted to your post.
              </FormHelperText>
            ) : (
              <FormErrorMessage> {errors.content}</FormErrorMessage>
            )}
            <Textarea
              borderRadius={"md"}
              placeholder=""
              size="sm"
              rows={10}
              mt={2}
              onChange={handleChange}
              name="content"
            />
          </FormControl>
          <div className="flex">
            <Button
              ml={"auto"}
              onClick={createPost}
              mr={5}
              isLoading={loading}
              colorScheme="blue"
            >
              Create Post
            </Button>
          </div>
        </div>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </>
  );
};
