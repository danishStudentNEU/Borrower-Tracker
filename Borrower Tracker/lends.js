import express from 'express';
import { sessions } from './sessions.js';

const router = express.Router();

const lends = {};

function getUsernameFromSession(req) {
  const sid = req.cookies.sid;
  const session = sessions[sid];
  return session && session.username;
}

router.get('/', (req, res) => {
  const username = getUsernameFromSession(req);

  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  res.json(lends[username] || []);
});

router.post('/', (req, res) => {
  const username = getUsernameFromSession(req);

  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  const { itemName, borrowerUsername, dateLent, dueDate } = req.body;

  if (
    !itemName || typeof itemName !== 'string' ||
    !borrowerUsername || typeof borrowerUsername !== 'string' ||
    !dateLent || typeof dateLent !== 'string' ||
    !dueDate || typeof dueDate !== 'string'
  ) {
    return res.status(400).json({ error: 'invalid-input' });
  }

  const entry = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    itemName: itemName.trim(),
    borrowerUsername: borrowerUsername.trim().toLowerCase(),
    dateLent,
    dueDate,
    isReturned: false,
    reminderSent: false,
  };

  if (!lends[username]) {
    lends[username] = [];
  }

  lends[username].unshift(entry);
  res.status(201).json(entry);
});

router.patch('/:id', (req, res) => {
  const username = getUsernameFromSession(req);
  const { id } = req.params;

  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  const userLends = lends[username] || [];
  const entry = userLends.find((e) => e.id === id);

  if (!entry) {
    return res.status(404).json({ error: 'not-found' });
  }

  const { isReturned, dueDate } = req.body;

  if (typeof isReturned === 'boolean') {
    entry.isReturned = isReturned;
  }

  if (typeof dueDate === 'string') {
    entry.dueDate = dueDate;
  }

  res.json(entry);
});

router.delete('/:id', (req, res) => {
  const username = getUsernameFromSession(req);
  const { id } = req.params;

  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }

  const userLends = lends[username] || [];
  const index = userLends.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'not-found' });
  }

  const removed = userLends.splice(index, 1);
  res.json(removed[0]);
});

export default router;
