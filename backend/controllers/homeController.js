const User = require('../models/User')


exports.getHome = (req, res) => {
  res.render('home');
};

exports.getPrivacyPolicy = (req, res) => {
  res.render('privacypolicy');
};

exports.getMenu = async (req, res) => {
  res.render('menu');
};


// exports.getProfile = async (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('profile');
//   } else {
//     // res.status(401).send('Unauthorized. Please log in.');
//     res.redirect('login')
//   }
// };

exports.getUserProfile = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('profile', { user }); // Assuming 'profile' is your profile page template
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user profile');
  }
};

exports.getDashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('dashboard/dashboard');
  } else {
    // res.status(401).send('Unauthorized. Please log in.');
    res.redirect('/login')
  }
}

