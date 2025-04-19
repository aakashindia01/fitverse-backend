// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../utils/tokenBlacklist');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: 'Token has been blacklisted' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
