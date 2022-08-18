import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser } from "../store/userSlice";

const RegisterScreen = () => {

  let user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(registerUser({username, email, password})) ;

    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
      setIsLoggedIn(true)
    }
    
  };
  if (isLoggedIn) {
    return <Navigate replace to ='/' />
  } else {
    return (<>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <label>
          enter email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <br />
        <label>
          enter username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>

        <br />
        <label>
          enter password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <br/>

      <div>Already have an account?</div>
      <Link to={"/login"} >
        Login instead
      </Link>
    </>)
  }
};

export default RegisterScreen;
