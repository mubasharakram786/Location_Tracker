const express = require('express')

const router = express.Router();

const {getPlaces,getPlaceByUserId,createNewPlace,updatePlace,deletePlace} = require('../controllers/place-controllers')



router.get('/:pid', getPlaces)

router.get('/user/:uid', getPlaceByUserId)

router.post('/', createNewPlace)

router.patch('/:pid', updatePlace)

router.delete('/:pid', deletePlace)


module.exports = router