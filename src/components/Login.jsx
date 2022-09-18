import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // to prevent default refresh of page when we click on buttom
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setError(false);
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };

  /** Checking log in  */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // logged in
        navigate("/main");
      }
    });
  }, []);

  // move to sign up
  const moveToSignUp = () => {
    navigate("/singup");
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="form-login">
        <input
          className="field"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="field"
          type="password"
          placeholder="password"
          onChange={(e) => setPasword(e.target.value)}
        ></input>
        <button className="btn-login" type="submit">
          login
        </button>
        {error ? (
          <span className="text-red-500 text-lg">
            Wrong email or password !
          </span>
        ) : (
          ""
        )}
        <div>
          <h1
            onClick={moveToSignUp}
            className="text-slate-900 
          pt-4 hover:border-b-2 border-slate-900 
          hover:cursor-pointer"
          >
            Create a new account
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
