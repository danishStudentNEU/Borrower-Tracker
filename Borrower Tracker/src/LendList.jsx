import { useEffect, useState } from "react";
import {
  fetchLends,
  updateLend,
  deleteLend,
  sendReminder,
} from "./services.js";

function LendList({ username, setError }) {
  const [lends, setLends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLends()
      .then((entries) => {
        setLends(entries);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.error || "Failed to fetch lends");
        setLoading(false);
      });
  }, []);

  function handleMarkReturned(id) {
    updateLend(id, { isReturned: true })
      .then((updated) => {
        setLends((prev) =>
          prev.map((lend) => (lend.id === id ? updated : lend))
        );
      })
      .catch((err) => {
        setError(err?.error || "Failed to update lend");
      });
  }

  function handleDelete(id) {
    deleteLend(id)
      .then(() => {
        setLends((prev) => prev.filter((lend) => lend.id !== id));
      })
      .catch((err) => {
        setError(err?.error || "Failed to delete lend");
      });
  }

  function handleSendReminder(toUser, itemName) {
    setError("");
    setMessage("");
    sendReminder(toUser, itemName)
      .then(() => {
        setMessage(`Reminder sent to ${toUser}`);
      })
      .catch((err) => {
        setError(err?.error || "Failed to send reminder");
      });
  }

  function isPastDue(dueDate) {
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  }

  if (loading) {
    return <div className="loading">Loading lends...</div>;
  }

  if (!lends.length) {
    return <p>No items lent yet.</p>;
  }

  return (
    <section className="lend-list">
      <h2>Your Lent Items</h2>
      {message && <p className="success">{message}</p>}
      <ul>
        {lends.map((lend) => {
          const overdue = !lend.isReturned && isPastDue(lend.dueDate);

          console.log("---");
          console.log("Today:", new Date().toISOString().split("T")[0]);
          console.log("Due Date:", lend.dueDate);
          console.log("Is Returned:", lend.isReturned);
          console.log("Overdue?", overdue);

          return (
            <li key={lend.id} className={lend.isReturned ? "returned" : ""}>
              <strong>{lend.itemName}</strong> to{" "}
              <em>{lend.borrowerUsername}</em>
              {overdue && <span className="overdue-label">Overdue</span>}
              <br />
              Lent: {lend.dateLent} | Due: {lend.dueDate}
              <div className="lend-actions">
                {!lend.isReturned && (
                  <button onClick={() => handleMarkReturned(lend.id)}>
                    Mark as Returned
                  </button>
                )}
                <button onClick={() => handleDelete(lend.id)}>Delete</button>

                {overdue && (
                  <button
                    onClick={() =>
                      handleSendReminder(lend.borrowerUsername, lend.itemName)
                    }
                  >
                    Send Reminder
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LendList;
