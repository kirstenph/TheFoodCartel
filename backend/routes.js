const { Router } = require('express');
const router = Router();

//uploads
const mutler = require('multer');
const { storage } = require('./cloudinary');
const upload = mutler({ storage });

const { isLoggedIn, isAdmin, isStaff } = require('./middleware');
const home = require('./controllers/homeController');
const auth = require('./controllers/authController');
const admin = require('./controllers/adminController')
const food = require('./controllers/foodController')

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
// router.get('/dashboard/food', isLoggedIn, isAdmin, home.getFood_ejs);


// Food
// Create a new food
router.post('/createFood', isLoggedIn, upload.single('image'), isAdmin, food.createFood);

// Get all food
router.get('/dashboard/food', isLoggedIn, isAdmin, food.getFoods);

module.exports = router;
