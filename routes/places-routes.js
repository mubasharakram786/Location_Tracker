const express = require('express')

const {check} = require("express-validator")

const router = express.Router();

const {getPlaceById,getPlacesByUserId,createNewPlace,updatePlace,deletePlace} = require('../controllers/place-controllers');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');


router.get('/:pid', getPlaceById)

router.get('/user/:uid', getPlacesByUserId)

router.post('/', upload.array("images"), ([
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
    check('address').not().isEmpty()
]), authenticate, createNewPlace)

router.patch('/:pid',upload.array("images"),([
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
]), updatePlace)

router.delete('/:pid', deletePlace)


module.exports = router