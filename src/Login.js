import React, { useState, useEffect } from "react";
import { login } from "./utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const showError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    showError();

    try {
      await login({ username, password });

      setIsLoggedIn(true);
      showError();
    } catch (error) {
      showError(true, "incorrect password or username!");
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };
  
  const handleLogin = () => {
    setUsername("");
    setPassword("");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      showError();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);
  return (
    <>
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1 className="greeting">welcome, {username}</h1>
            <button className="submit" onClick={handleLogin}>
              logout
            </button>
          </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error.show && (
              <p id="alert" className="error">
                {error.msg}
              </p>
            )}
            <p>login</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? "logging in..." : "login"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default Login;
