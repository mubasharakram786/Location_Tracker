const express = require('express')

const {check} = require("express-validator")

const router = express.Router();

const {getPlaces,getPlacesByUserId,createNewPlace,updatePlace,deletePlace} = require('../controllers/place-controllers')



router.get('/:pid', getPlaces)

router.get('/user/:uid', getPlacesByUserId)

router.post('/', ([
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
    check('address').not().isEmpty()
]), createNewPlace)

router.patch('/:pid',([
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
]), updatePlace)

router.delete('/:pid', deletePlace)


module.exports = router