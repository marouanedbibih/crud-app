import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { createRef, useState } from "react";
import axiosClient from "../api/axios-client.js";

function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setAccessToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setAccessToken(data.token);
        setMessage(null); // Clear the error message on successful login
        setErrors(null); // Clear the validation errors on successful login
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          setMessage(null); // Clear the custom message if validation errors occur
        } else if (response && response.status === 404) {
          setMessage(response.data.message);
          setErrors(null); // Clear validation errors if a custom message is shown
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((field) =>
                errors[field].map((error, index) => <p key={index}>{error}</p>)
              )}
            </div>
          )}

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="text" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
