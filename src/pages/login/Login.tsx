import React from "react";
import "./login.css"; // Import your stylesheet
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/");
          }}
        >
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
