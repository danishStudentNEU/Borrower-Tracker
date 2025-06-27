import express from 'express';
import { sessions, users } from './sessions.js';

const router = express.Router();

const reminders = {};

function getUsernameFromSession(req) {
  const sid = req.cookies.sid;
  const session = sessions[sid];
  return session && session.username;
}

router.post('/', (req, res) => {
  const sender = getUsernameFromSession(req);

  if (!sender) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  const { toUser, itemName } = req.body;

  if (
    !toUser || typeof toUser !== 'string' ||
    !itemName || typeof itemName !== 'string'
  ) {
    return res.status(400).json({ error: 'invalid-input' });
  }

  const cleanToUser = toUser.trim().toLowerCase();

  if (!users[cleanToUser]) {
    return res.status(404).json({ error: 'user-not-found' });
  }

  const reminder = {
    fromUser: sender,
    itemName: itemName.trim(),
    timestamp: new Date().toISOString(),
  };

  if (!reminders[cleanToUser]) {
    reminders[cleanToUser] = [];
  }

  reminders[cleanToUser].unshift(reminder);

  res.status(201).json(reminder);
});

router.get('/', (req, res) => {
  const username = getUsernameFromSession(req);

  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  res.json(reminders[username] || []);
});

export default router;
