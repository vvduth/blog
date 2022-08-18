import React, { FC, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/userSlice";

const LoginScreen: FC<any> = () => {
  let user = useAppSelector((state:any) => state.user.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 
  
  const submitHandler = async (e: any) => {
    e.preventDefault();
    
    await dispatch(loginUser({ email, password }));
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
    if (loggedInUser) {
      setIsLoggedIn(true)
    }
    
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <>
        <h1>LoginScreen</h1>

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
          <button type="submit">Login</button>
          <div>New to this blog?</div>
          <Link to={"/register"}>Register instead</Link>
        </form>
      </>
    );
  }
};

export default LoginScreen;
