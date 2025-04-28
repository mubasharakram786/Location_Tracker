const express = require('express')

const router = express.Router();

const {getPlaces,getPlaceByUserId,createNewPlace} = require('../controllers/place-controllers')



router.get('/:pid', getPlaces)

router.get('/user/:uid', getPlaceByUserId)

router.post('/', createNewPlace)


module.exports = router