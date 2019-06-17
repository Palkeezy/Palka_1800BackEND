const router = require('express').Router();

const createUser = require('../controllers/user/createUser');

router.post('/', createUser);

module.exports = router;