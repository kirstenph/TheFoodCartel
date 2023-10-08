const { Router } = require('express');
const router = Router();

//uploads
const mutler = require('multer');
const { storage } = require('./cloudinary');
const upload = mutler({ storage });

const { isLoggedIn, isAdmin, isStaff } = require('./middleware');
const home = require('./controllers/homeController');
const auth = require('./controllers/authController');
const food = require('./controllers/foodController')

router.get('/', home.getHome);
router.get('/privacy-policy', home.getPrivacyPolicy);
router.get('/menu', home.getMenu);

// Auth
router.post('/register', auth.postRegister);
router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin, auth.postRegister);
router.get('/logout', auth.getLogout);

// router.get('/profile', isLoggedIn, home.getProfile)
router.get('/profile/:id', isLoggedIn, home.getUserProfile);
router.get('/profile/', isLoggedIn, auth.redirectToOwnProfile);


router.get('/dashboard', isLoggedIn, isAdmin, home.getDashboard)
router.get('/dashboard/food', isLoggedIn, isAdmin, food.getFoods);





// Food
router.post('/createFood', isLoggedIn, upload.single('image'), isAdmin, food.createFood);
router.delete('/dashboard/food/:id', isLoggedIn, isAdmin, food.deleteFood);
router.put('/dashboard/food/:id', isLoggedIn, isAdmin, upload.single('image'), food.editFood);



module.exports = router;
