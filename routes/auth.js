const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models/userModel');

const router = express.Router();

// Render pages
router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.render('dashboard', { user: req.session.username });
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err) => {
      if (err) {
        console.log(err);
        return res.send('Error creating user');
      }
      res.redirect('/login');
    }
  );
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.send('User not found');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Invalid credentials');

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/dashboard');
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
