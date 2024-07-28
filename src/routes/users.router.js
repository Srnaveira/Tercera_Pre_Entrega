const  express = require('express');
const usersRenderController = require('../controllers/usersRenderController.js')
const { isAuthenticated, isNotAuthenticated } = require ('../middleware/auth.js');

const router = express.Router();

router.get('/login', isNotAuthenticated, usersRenderController.renderLogin);

router.get('/register', isNotAuthenticated, usersRenderController.renderRegister);

router.get('/current', isAuthenticated, usersRenderController.renderProfile);

router.get('/user', isAuthenticated, usersRenderController.renderUser);

module.exports = router;
