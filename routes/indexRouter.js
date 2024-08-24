const express = require('express');
const router = express.Router();

const { landingPageController, registerPageControlller, registerController, loginController, logoutController, profilePageController } = require('../controllers/indexController');

const{isLoggedIn, redirectToProfile} = require('../middlewares/middleware')

router.get('/',redirectToProfile, landingPageController);
router.get('/register',registerPageControlller);
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/logout',logoutController)
router.get('/profile',isLoggedIn,profilePageController)


module.exports = router;
