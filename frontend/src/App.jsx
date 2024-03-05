import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Posts from "./Components/Posts";
import { MyPosts } from "./Components/MyPosts";
import { CreatePost } from "./Components/CreatePost";
import Error from "./Components/Error";
import { SignUp } from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { useDispatch } from "react-redux";
import { fetchUser } from "./State/User/userAction";
import { initFlowbite } from "flowbite";

function App() {
   useEffect(() => {
     initFlowbite();
   }, []);
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
