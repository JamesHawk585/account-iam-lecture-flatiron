import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./styles.css";

const Authentication = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpClick = () => setSignUp((signUp) => !signUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(signUp ? userData : { name: userData.name, password: userData.password }),
    };

    fetch(signUp ? "/users" : "/login", config)
      .then((r) => {
        if (r.ok) {
          navigate("/")
          console.log("Response is ok");
        } else {
          r.json().then((data) => {
            setTimeout(() => {
              setErrors([]);
            }, 30000);
            setErrors(data.errors)
          });
        }
      })
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
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
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
        {/* Use uuid for error element key. */}
        <h2 className="auth-errors">{errors ? errors.map(err => <p key={err} style={{color: "red"}}>{err}</p>) : null}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={handleSignUpClick}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </>
  );
};

export default Authentication;
