// authMiddleware.js
const { User } = require('./models/User');

exports.requireSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user || !user.isSuperAdmin) {
      return res.status(403).json({ error: 'Access denied. Only super admins are allowed.' });
    }

    next(); // Proceed to the next middleware or route handler if the user is a super admin.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
