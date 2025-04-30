const express = require('express')

const router = express.Router();

const {getAllUsers,loginUser,registerUser} = require('../controllers/user-controllers')

router.get('/', getAllUsers)

router.post('/login', loginUser)

router.post('/register', registerUser)

module.exports = router