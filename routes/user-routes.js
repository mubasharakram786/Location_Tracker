const express = require('express')

const {check} = require('express-validator')
const router = express.Router();

const {getAllUsers,loginUser,registerUser} = require('../controllers/user-controllers')

router.get('/', getAllUsers)

router.post('/register',([
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})
]), registerUser)

router.post('/login', loginUser)


module.exports = router