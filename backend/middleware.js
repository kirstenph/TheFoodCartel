module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Access denied: You are not an administrator.');
};

module.exports.isStaff = (req, res, next) => {
  if (req.user.role === 'staff') {
    return next();
  }
  res.status(403).send('Access denied: You are not staff or an administrator.');
};
