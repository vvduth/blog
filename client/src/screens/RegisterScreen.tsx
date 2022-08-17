import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [username, setUsername] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const submitHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
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
    </>
  );
};

export default RegisterScreen;
