import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Posts from "./Components/Posts";
import MyPosts from "./Components/MyPosts";
import { CreatePost } from "./Components/CreatePost";
import Error from "./Components/Error";
import { SignUp } from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./State/User/userAction";
import { initFlowbite } from "flowbite";

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  useEffect(() => {
    initFlowbite();
  }, []);
  useEffect(() => {
    if (!data) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo) {
        dispatch(fetchUser(userInfo));
      } else {
      }
    } else {
      // window.location.reload();
    }
  }, [data]);

  return (
    <div className=" min-h-screen ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/mypost" element={<MyPosts />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* <Route path="/students" element={<Studenys />} />
          <Route path="/student/:id" element={<Student />} />

          <Route path="/teachers" element={<Teachers />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
