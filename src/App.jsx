import React from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};
