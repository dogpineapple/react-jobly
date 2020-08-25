import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useHistory } from "react-router-dom";
import "./LoginSignUp.css";

function LogInSignUp({ logIn, isLoggedIn }) {
  // State that toggles between login and sign up form
  const [isLoginForm, setIsLoginForm] = useState(true);
  // State that holds an array of errors to map over to show in DOM
  const [listOfErrors, setListOfErrors] = useState([]);
  const history = useHistory();

  // check if user is logged in. if logged in, redirect to the welcome page.
  useEffect(function checkIfLoggedIn() {
    if (isLoggedIn) {
      return history.push("/");
    }
  }, [history, isLoggedIn]);

  // loginUser: obtain token from backend and set token to localStorage
  // redirect the successfully logged in user to "/jobs" 
  const loginUser = async (data) => {
    // clear error before each login attempt
    setListOfErrors([]);
    try {
      const token = await JoblyApi.login(data);
      localStorage.setItem("_token", token);
      logIn(true);
      history.push("/jobs");
    } catch (err) {
      let errMsg = err.response.data.message;
      setListOfErrors([errMsg]);
    }
  };

  // signUpUser: obtain token from backend and set token to localStorage
  // redirect the successfully signed up user to "/jobs" 
  const signUpUser = async (data) => {
    setListOfErrors([]);
    try {
      const token = await JoblyApi.signup(data);
      localStorage.setItem("_token", token);
      logIn(true);
      history.push("/jobs");
    } catch (err) {
      let errMsg = err.response.data.message;
      setListOfErrors(errMsg);
    }
  }

  const handleFormToggle = () => {
    setListOfErrors([]);
    setIsLoginForm(!isLoginForm);
  }

  // add handleSetIsLoginForm that resets the listOfErrors to [] and switches isLoginForm val.

  return (
    <div className="LoginSignUp">
      <div className="LoginSignUp-container">
        <h1 className="LoginSignUp-title">Log in, Sign up</h1>
        <div className="LoginSignUp-toggle-btns">
        <button disabled={isLoginForm} onClick={handleFormToggle}>Login</button>
        <button disabled={!isLoginForm} onClick={handleFormToggle}>Sign Up</button>
        </div>
        {isLoginForm ? <LoginForm login={loginUser} /> : <SignUpForm signUp={signUpUser} />}
        {listOfErrors?.map(err => {
          return <p className="LoginSignUp-error" key={err}>{err}</p>;
        })}
      </div>
    </div>
  );
}

export default LogInSignUp;