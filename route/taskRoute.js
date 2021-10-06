const router = require('express').Router();
const { getTasks, setTasks, getSingleTask } = require('../controller/taskController');


// /api/tasks/*
router.post('/', setTasks);
router.get('/:uid', getTasks);
router.get('/task', getSingleTask);

// router.patch('/task/update/:uid',updateUser);
// router.delete('/task/delete/:uid',deleteUser);

// Member sections 
// /api/users/*
// router.get('/member/all',getMemberAll);
// router.post('/member/add',addMember);
// router.get('/member/:id',getMember);
// router.put('/member/update/:id',updateMember);
// router.post('/member/delete/:id',deleteMember);

module.exports = router;