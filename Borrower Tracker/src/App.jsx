import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import LendList from "./LendList.jsx";
import AddLend from "./AddLend.jsx";
import ReminderInbox from "./ReminderInbox.jsx";
import { fetchSession, fetchLogout } from "./services.js";

import "./style.css";
import "./login.css";
import "./lend.css";
import "./add-lend.css";
import "./reminders.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("lends"); 

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setUsername(data.username);
        setIsLoggedIn(true);
        setError("");
      })
      .catch(() => {
        setUsername("");
        setIsLoggedIn(false);
      });
  }, []);

  function handleLogout() {
    fetchLogout().then(() => {
      setUsername("");
      setIsLoggedIn(false);
      setError("");
    });
  }

  function renderContent() {
    if (view === "add") {
      return <AddLend username={username} setError={setError} />;
    }
    if (view === "reminders") {
      return <ReminderInbox />;
    }
    return <LendList username={username} setError={setError} />;
  }

  return (
    <div className="app">
      {error && <div className="error">{error}</div>}

      {!isLoggedIn && (
        <Login
          onLoginSuccess={(name) => {
            setUsername(name);
            setIsLoggedIn(true);
            setError("");
          }}
          setError={setError}
        />
      )}

      {isLoggedIn && (
        <div className="main-wrapper">
          <div className="main-container">
            <h2 className="welcome-heading">Welcome, {username}</h2>
            <nav className="nav-bar">
              <button onClick={() => setView("lends")}>My Lends</button>
              <button onClick={() => setView("add")}>Add Lend</button>
              <button onClick={() => setView("reminders")}>Reminders</button>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="view-content">{renderContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
