const db = require('../models');
const { generateToken } = require('../utils/jwt.util');
const { comparePassword } = require('../utils/password.util');
const bcrypt = require('bcryptjs');
const { blacklistToken } = require('../utils/tokenBlacklist');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    const usertype = await db.UserType.findOne({ where: { id: user.userTypeId } });
    const tenant = await db.Tenant.findOne({ where: { tenantId: user.tenantId } });
    if(usertype){
        user.userType = usertype.name;
    }
    if(tenant){
        user.tenantName = tenant.name;
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      tenantId: user.tenantId,
      profilePhoto: user.profilePhoto,
      tenantName: user.tenantName,
      logo: user.tenantLogo
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        userId: user.userId,
        tenantId: user.tenantId
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.resetPassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'db.User not found' });
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(400).json({ message: 'Token not found' });
  
      blacklistToken(token);
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
  
