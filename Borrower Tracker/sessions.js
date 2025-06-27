import express from 'express';
import { randomUUID } from 'crypto';

const router = express.Router();
const sessions = {};
const users = {}; 

router.post('/', (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'invalid-username' });
  }

  if (username.toLowerCase() === 'dog') {
    return res.status(403).json({ error: 'auth-insufficient' });
  }

  if (!users[username]) {
    return res.status(404).json({ error: 'user-not-registered' });
  }

  const sid = randomUUID();
  sessions[sid] = { username };

  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.json({ username });
});

router.delete('/', (req, res) => {
  const sid = req.cookies.sid;

  if (sid) {
    delete sessions[sid];
    res.clearCookie('sid');
  }

  res.json({ wasLoggedIn: !!sid });
});

export default router;
export { sessions, users };
