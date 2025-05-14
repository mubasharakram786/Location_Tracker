const mongoose = require('mongoose')
const Place = require('../models/place')
const User = require('../models/user')
const {validationResult } = require('express-validator')
const HttpError = require('../models/error-model');
const getCoordinate = require('../utils/location');

const getPlaceById = async(req,res,next)=>{
    const pid = req.params.pid;
    let place;
    try{
     place = await Place.findById(pid)
    }catch(error){
        error = new HttpError("Fetching places failed, please try again",500)
        return next(error)
    }
    if(!place){
        const error = new HttpError("No place found for the provided place ID",404)
        return next(error)
    }

    res.json({place:place.toObject({getters:true})})
}

const getPlacesByUserId = async(req,res,next)=>{
    const userId = req.params.uid;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places')
    } catch (err) {
       const error = new HttpError("Fetching places failed, please try again",500)
        return next(error)
    }
    if(!userWithPlaces || userWithPlaces.places.length === 0){
        return next(new HttpError("No places found for the provided user ID",404))
    }
    res.json({
        places:userWithPlaces.places.map((place)=> place.toObject({getters:true}))
    })
}

const createNewPlace = async(req,res,next)=>{
  const {title,description,address,creator} = req.body;
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new HttpError("Please add the data in the following fields",422)
  }
  let coordinates;
  try {
     coordinates = await getCoordinate(address)
  } catch (error) {
    return next(error)
  }
    const createdPlace = new Place({
        title,
        description,
        address,
        location:coordinates,
        image:"https://static.vecteezy.com/system/resources/thumbnails/052/248/075/small_2x/peacock-feather-wallpaper-hd-wallpaper-photo.jpeg",
        creator
    }) 
    let user
    try {
        user = await User.findById(creator)
    } catch (error) {
        error = new HttpError("Creating place failed, please try again",500)
        return next(error)
    }
    if(!user){
        const error = new HttpError("Couldn't find the user",404)
        return next(error)
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        error = new HttpError("Creating place failed, try again", 500)
       return next(error)
    }
  return res.status(201).json({
    place:createdPlace
  })

}

const updatePlace = async(req,res,next)=>{
    const placeId = req.params.pid;
    const {title,description} = req.body;
    const errors = validationResult(req)
    console.log(errors)
        if(!errors.isEmpty()){
            next(new HttpError("Please add the data in the following fields",422))
        }
        let updatePlace;
        try {
            updatePlace = await Place.findByIdAndUpdate(placeId,{title:title,description:description},{new:true});
            
        } catch (error) {
            return next(new HttpError('Failed to update the place',500))
        }

    res.status(200).json({
        place:updatePlace.toObject({getters:true}),
        message:"Place has been updated successfully!"
    })
}


const deletePlace = async(req,res,next)=>{
    const placeId = req.params.pid;
        let place;
     try {
       place = await Place.findById(placeId).populate('creator');
     } catch (error) {
        error = new HttpError('No product found for the provided Id',404)
     }
     if(!place){
        const error = new HttpError("Couldn't find the place for the provided Id",404)
     }
     try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await place.deleteOne({session:sess})
        place.creator.places.pull(place)
        await place.creator.save({session:sess})
        await sess.commitTransaction();
        
     } catch (error) {
        error = new HttpError("Place is not deleting, please try again",500)
     }
    res.status(200).json({
        message:"Place has been deleted successfully!",
    })
}

module.exports = {getPlaceById,getPlacesByUserId,createNewPlace,updatePlace,deletePlace}