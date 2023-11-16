const User = require('../models/User');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    let image = { url: 'https://res.cloudinary.com/dmaajhgat/image/upload/v1696584757/alxcx0noocll2ba0pg42.png', filename: 'default.jpg' }; // Default image

    if (req.file) {
      image = { url: req.file.path, filename: req.file.filename };
    }

    const user = new User({ firstName, lastName, email, role, image })
    await user.setPassword(password);
    await user.save();
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
};


exports.redirectToOwnProfile = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`/profile/${req.user.id}`);
  } else {
    return res.redirect('/login');
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
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(`/profile/${user.id}`);
      });
    } else if (user.role === 'admin' || user.role === 'staff') {
      req.logIn(user, (err) => {
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
