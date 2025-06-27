import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import sessions from "./sessions.js";
import users from "./users.js";
import lends from "./lends.js";
import reminders from "./reminders.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/session", sessions);
app.use("/api/users", users);
app.use("/api/lends", lends);
app.use("/api/reminders", reminders);

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
