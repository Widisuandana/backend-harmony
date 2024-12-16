const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret, refreshSecret, tokenExpiration, refreshTokenExpiration } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: tokenExpiration });
    const refreshToken = jwt.sign({ id: user._id }, refreshSecret, { expiresIn: refreshTokenExpiration });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh Token is required' });
  
  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const accessToken = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: tokenExpiration });
    res.json({ accessToken });
  });
};