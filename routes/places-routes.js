const express = require('express')

const router = express.Router();

const {getPlaces,getPlacesByUserId,createNewPlace,updatePlace,deletePlace} = require('../controllers/place-controllers')



router.get('/:pid', getPlaces)

router.get('/user/:uid', getPlacesByUserId)

router.post('/', createNewPlace)

router.patch('/:pid', updatePlace)

router.delete('/:pid', deletePlace)


module.exports = router