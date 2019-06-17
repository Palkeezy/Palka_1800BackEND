const router = require('express').Router();

const authUser = require('../controllers/auth/authUser');


router.post('/user', authUser);


module.exports = router;