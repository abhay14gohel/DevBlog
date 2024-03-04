import { useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./Components/Posts";
import { MyPosts } from "./Components/MyPosts";
import {CreatePost} from "./Components/CreatePost"

function App() {
  return (
    <div className=" min-h-screen ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/mypost" element={<MyPosts />} />
          <Route path="/createpost" element={<CreatePost />} />
          {/* <Route path="/students" element={<Studenys />} />
          <Route path="/student/:id" element={<Student />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
