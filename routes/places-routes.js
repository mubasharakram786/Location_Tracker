const express = require('express')

const router = express.Router();

const {getPlaces,getPlaceByUserId} = require('../controllers/place-controllers')



router.get('/:pid', getPlaces)

router.get('/user/:uid', getPlaceByUserId)


module.exports = router