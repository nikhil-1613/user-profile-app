const express = require('express');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username } = req.body;


  if (!username) return res.status(400).json({ message: 'Username is required' });

  const user = {
    id: 1,
    username: username,
    role: 'developer'
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
