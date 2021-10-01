const router = require('express').Router();
const {login, register, profile, allUsers } = require('../controller/userController');
const User = require('../model/User');

router.post('/register', register);
router.post('/login',login);
router.get('/profile/:uid',profile)
router.get('/', allUsers);

module.exports = router;