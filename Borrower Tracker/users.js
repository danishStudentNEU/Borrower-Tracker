import express from 'express';
import { users, sessions } from './sessions.js';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/', (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'invalid-username' });
  }

  const cleanUsername = username.trim().toLowerCase();

  if (cleanUsername === 'dog') {
    return res.status(403).json({ error: 'banned-user' });
  }

  if (users[cleanUsername]) {
    return res.status(409).json({ error: 'user-exists' });
  }

  users[cleanUsername] = { username: cleanUsername };

  const sid = randomUUID();
  sessions[sid] = { username: cleanUsername };

  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.status(201).json({ username: cleanUsername });
});

export default router;
