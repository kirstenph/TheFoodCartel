const User = require('../models/User');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({ firstName, lastName, email, role });
    await user.setPassword(password);
    await user.save();
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.redirect('/login');
    }

    if (user.role === 'customer') {
      return req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/profile');
      });
    } else if (user.role === 'admin' || user.role === 'staff') {
      return req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/dashboard');
      });
    } else {
      return res.redirect('/login');
    }
  })(req, res, next);
};


exports.getLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/')
    }
  });
};
