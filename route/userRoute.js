const router = require('express').Router();
const {login, register, profile, updateUser, deleteUser } = require('../controller/userController');
const User = require('../model/User');


// /api/users/*
router.post('/register', register);
router.post('/login',login);
router.get('/profile/:uid',profile);

router.patch('/update/:uid',updateUser);
router.delete('/delete/:uid',deleteUser);

// Member sections 
// /api/users/*
// router.get('/member/all',getMemberAll);
// router.post('/member/add',addMember);
// router.get('/member/:id',getMember);
// router.put('/member/update/:id',updateMember);
// router.post('/member/delete/:id',deleteMember);

module.exports = router;