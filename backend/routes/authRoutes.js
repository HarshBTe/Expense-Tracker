const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Existing routes
const { register, login, logout } = require('../controllers/authController');
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// New /auth/check route
router.get('/check', authMiddleware, (req, res) => {
  res.status(200).send({ message: "Authenticated" });
});

module.exports = router;
