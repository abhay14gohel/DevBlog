import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import LandingPage from "./LandingPage";
import axios from "axios";
import { Badge, Tag, TagLabel, useToast } from "@chakra-ui/react";

const Post = () => {
  const { data: user } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const toast = useToast();
  const [comment, setComment] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      let { data } = await axios.get(`/api/api/comment/${id}`);

      setComments(data?.reverse());
    } catch (error) {
      toast({
        title: "Could not load Comments.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const fetchPost = async () => {
    try {
      let { data } = await axios.get(`/api/api/post/${id}`);

      const dateObj = new Date(data.addedDate);
      const extractedDate = dateObj.getDate();
      const extractedMonth = dateObj.toLocaleString("default", {
        month: "long",
      });
      const extractedYear = dateObj.getFullYear();
      data.addedDate =
        extractedMonth + ". " + extractedDate + ", " + extractedYear;
      setPost(data);
    } catch (error) {
      toast({
        title: "Could not load this Post.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const addComments = async () => {
    try {
      let { data } = await axios.post(
        `/api/api/comment/post/${id}/user/${user?.id}`,
        { content: comment }
      );

      setComments((prev) => {
        return [data, ...prev];
      });

      toast({
        title: "Comment Added.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      setComment("");
    } catch (error) {
      toast({
        title: "Could not add Comments.",
        description: error.response.data.content,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      fetchPost();
      fetchComments();
    }
  }, [user, id]);

  return (
    <div>
      {user ? (
        <>
          <main className="pt-8 pb-16 lg:pt-5 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src={
                          post?.user?.imgUrl ||
                          "https://res.cloudinary.com/ddao02zyw/image/upload/v1709668507/user_149071_q5h0on.png"
                        }
                        alt={post?.user?.name}
                      />
                      <div>
                        <p
                          href="#"
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white capitalize"
                        >
                          {post?.user?.name}
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400 capitalize">
                          {post?.user?.about}
                        </p>

                        <p className="text-base text-gray-500 dark:text-gray-400">
                          <time
                            pubdate
                            datetime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            {post?.addedDate}
                          </time>
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400 capitalize">
                          <Tag borderRadius="full" variant="solid" bg="#007DFE">
                            <TagLabel>
                              {" "}
                              #{post?.category?.categoryTitle}
                            </TagLabel>
                          </Tag>
                        </p>
                      </div>
                    </div>
                  </address>
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white capitalize">
                    {post?.title}
                  </h1>
                </header>

                <figure>
                  <img
                    src={post?.imageName}
                    width={"100%"}
                    className="object-fill rounded-md"
                    // src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                    alt=""
                  />
                </figure>

                <p className="mt-1 capitalize">{post?.content}</p>

                <section className="not-format mt-5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                      Comments ({comments?.length})
                    </h2>
                  </div>
                  <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label for="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        id="comment"
                        rows="1"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required
                      ></textarea>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addComments();
                      }}
                      type=""
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Post comment
                    </button>
                  </form>

                  {comments?.map((comment) => {
                    return (
                      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white capitalize">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment?.userImg}
                                alt={comment?.userName}
                              />
                              {comment?.userName}
                            </p>
                          </div>
                        </footer>
                        <p className="capitalize">{comment?.content}</p>
                      </article>
                    );
                  })}
                </section>
              </article>
            </div>
          </main>
        </>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </div>
  );
};

export default Post;
