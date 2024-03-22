import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./styles.css";

const Authentication = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const handleSignUpClick = () => setSignUp((signUp) => !signUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signUp ? userData : {"name": userData.name}),
    };
    fetch(signUp ? "/users" : "http://127.0.0.1:5555/login", config)
      .then((r) => r.json())
      .then((user) => {
        updateUser(user);
        navigate("/")

      });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const userDataCopy = { ...userData };
    userDataCopy[name] = value;

    setUserData(userDataCopy);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>
      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">{"Errors here!!"}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={handleSignUpClick}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </>
  );
};
export default Authentication;
