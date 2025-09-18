const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  return jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;
