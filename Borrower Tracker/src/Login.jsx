import { useState } from "react";
import { fetchLogin, fetchRegister } from "./services.js";

function Login({ onLoginSuccess, setError }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [mode, setMode] = useState("login"); 

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanUsername = usernameInput.trim().toLowerCase();
    if (!cleanUsername) {
      setError("Username is required");
      return;
    }

    const action = mode === "login" ? fetchLogin : fetchRegister;

    action(cleanUsername)
      .then(() => {
        onLoginSuccess(cleanUsername);
      })
      .catch((err) => {
        setError(err?.error || "Something went wrong");
      });
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Borrow Tracker</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
            <input
              id="username"
              value={usernameInput}
              onInput={(e) => setUsernameInput(e.target.value)}
            />
          </label>

          <div className="actions">
            <button type="submit">
              {mode === "login" ? "Log In" : "Register"}
            </button>
            <button
              type="button"
              onClick={() =>
                setMode((prev) => (prev === "login" ? "register" : "login"))
              }
            >
              Switch to {mode === "login" ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
