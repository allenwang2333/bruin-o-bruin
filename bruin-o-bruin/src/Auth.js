import React, { useState } from "react"
import {hashString} from 'react-hash-string'

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  async function handleSubmitSignin(event) {
    event.preventDefault()
    const params = new URLSearchParams();
    params.append('email', event.currentTarget.elements.email.value);
    params.append('password', hashString(event.currentTarget.elements.password.value).toString());
    const response = await fetch('http://localhost:8080/server_auth_signin', {method: 'POST', body: params});
    const msgFromResponse = await response.text();
    if(msgFromResponse.match(/^[a-zA-Z0-9]+$/)){
      alert("Successfully logged in");
      sessionStorage.setItem("userName", msgFromResponse);
      window.setTimeout(function() {
          window.location.href = "/";
      }, 500);
    } else {
      alert("Invalid email or password");
    }
  }

  async function handleSubmitSignup(event) {
    event.preventDefault()
    const params = new URLSearchParams();
    params.append('email', event.currentTarget.elements.email.value);
    params.append('password', hashString(event.currentTarget.elements.password.value).toString());
    params.append('fullname', event.currentTarget.elements.fullname.value);
    const response = await fetch('http://localhost:8080/server_auth_signup', {method: 'POST', body: params});
    const msgFromResponse = await response.text();
    if(msgFromResponse.match(/^[a-zA-Z0-9]+$/)){
      alert("Successfully logged in");
      sessionStorage.setItem("userName", msgFromResponse);
      window.setTimeout(function() {
          window.location.href = "/";
      }, 500);
    } else {
      alert("The email is already registered");
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form onSubmit={handleSubmitSignin} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="https://it.ucla.edu/iamucla/reset-password">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmitSignup}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Joe Bruin"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="https://it.ucla.edu/iamucla/reset-password">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}