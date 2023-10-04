const { Router } = require('express');
const router = Router();

const { isLoggedIn, isAdmin } = require('./middleware');
const home = require('./controllers/homeController');
const auth = require('./controllers/authController');
const admin = require('./controllers/adminController')

router.get('/', home.getHome);
router.get('/privacy-policy', home.getPrivacyPolicy);
router.get('/menu', home.getMenu);

// Auth
router.post('/register', auth.postRegister);
router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin, auth.postRegister);
router.get('/logout', auth.getLogout);


router.get('/profile', isLoggedIn, home.getProfile)

// Admin
router.get('/dashboard', isLoggedIn, isAdmin, admin.getDashboard)



module.exports = router;
