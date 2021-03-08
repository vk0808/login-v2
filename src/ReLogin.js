import React, { useReducer } from "react";
import { login } from "./utils";

function loginReducer(state, action) {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
        error: ""
      };
    }
    case "error": {
      return {
        ...state,
        error: "incorrect password or username!",
        isLoggedIn: false
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        error: "",
        username: "",
        password: ""
      };
    }
    case "field": {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case "no_success": {
      return {
        ...state,
        isLoading: false
      };
    }
    default: {
      break;
    }
  }
  return state;
}

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  isLoggedIn: false,
  error: ""
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { username, password, isLoading, isLoggedIn, error } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
    dispatch({ type: "no_success" });
  };

  return (
    <>
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1 className="greeting">welcome, {username}</h1>
            <button
              className="submit"
              onClick={() => dispatch({ type: "logout" })}
            >
              logout
            </button>
          </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error && (
              <p id="alert" className="error">
                {error}
              </p>
            )}
            <p>login</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  name: "username",
                  value: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) =>
                dispatch({
                  type: "field",
                  name: "password",
                  value: e.target.value
                })
              }
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
