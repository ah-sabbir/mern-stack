const router = require('express').Router();
const {
    create,
    getAllMembers,
    getSingleMemeber,
    updateMember,
    deleteMember
} = require('../controller/memberController');


router.get('/:authId', getAllMembers);

router.post('/', create);

// get member
router.get('member/:uid', getSingleMemeber);

// update memeber 
router.put('/:uid', updateMember);

// delete memeber
router.delete('/:uid', deleteMember);



module.exports = router;