import { useEffect, useState } from "react";
import { fetchReminders } from "./services.js";

function ReminderInbox() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReminders()
      .then((data) => {
        setReminders(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err?.error || "Failed to load reminders");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading reminders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!reminders.length) {
    return <p>No reminders at this time.</p>;
  }

  return (
    <section className="reminder-inbox">
      <h2>Reminders You've Received</h2>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            <strong>{reminder.itemName}</strong> – Reminder from{" "}
            <em>{reminder.fromUser}</em>
            <br />
            Sent on: {new Date(reminder.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ReminderInbox;
