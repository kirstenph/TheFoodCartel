exports.getHome = (req, res) => {
  res.render('home');
};

exports.getPrivacyPolicy = (req, res) => {
  res.render('privacypolicy');
};

exports.getMenu = async (req, res) => {
  res.render('menu');
};

exports.getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('profile');
  } else {
    // res.status(401).send('Unauthorized. Please log in.');
    res.redirect('login')
  }
};



