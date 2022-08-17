import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/userSlice";

const LoginScreen = () => {
  
  let user = useAppSelector((state)=> state.user.user) ;
  const dispatch = useAppDispatch()  ; 
  
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(loginUser({email, password})) ;
    console.log(user)
    
  };

  
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
};

export default LoginScreen;
