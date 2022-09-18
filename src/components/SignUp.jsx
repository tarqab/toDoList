import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();


  /* create a new account function */
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed up
        navigate("/");
      })
      .catch((error) => {
        alert.message("error");
        // ..
      });
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {

  //     } else {
  //     }
  //   });
  // }, []);

  return (
    <div className="sign-up-layout">
      <h1 className="tittle-sign-up">Please enter your personal data</h1>
      <form onSubmit={handleSignUp} className="sing-up-form">
        <input
          className="input"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => setPasword(e.target.value)}
        ></input>
        <input
          className="input"
          type="password"
          placeholder="enter the password again"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button className="btn-sing-up" type="submit">
          Sign up now{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
