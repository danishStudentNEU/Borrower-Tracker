import { useState } from "react";
import { addLend } from "./services.js";

function AddLend({ username, setError }) {
  const [itemName, setItemName] = useState("");
  const [borrowerUsername, setBorrowerUsername] = useState("");
  const [dateLent, setDateLent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!itemName.trim() || !borrowerUsername.trim() || !dateLent || !dueDate) {
      setError("All fields are required");
      return;
    }

    const entry = {
      itemName: itemName.trim(),
      borrowerUsername: borrowerUsername.trim().toLowerCase(),
      dateLent,
      dueDate,
    };

    addLend(entry)
      .then(() => {
        setSuccessMessage("Lend added successfully");
        setItemName("");
        setBorrowerUsername("");
        setDateLent("");
        setDueDate("");
      })
      .catch((err) => {
        setError(err?.error || "Failed to add lend");
      });
  }

  return (
    <section className="add-lend">
      <h2>Add a New Lend</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onInput={(e) => setItemName(e.target.value)}
          />
        </label>

        <label>
          Borrower's Username:
          <input
            type="text"
            value={borrowerUsername}
            onInput={(e) => setBorrowerUsername(e.target.value)}
          />
        </label>

        <label>
          Date Lent:
          <input
            type="date"
            value={dateLent}
            onInput={(e) => setDateLent(e.target.value)}
          />
        </label>

        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onInput={(e) => setDueDate(e.target.value)}
          />
        </label>

        <button type="submit">Add Lend</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
    </section>
  );
}

export default AddLend;
