const Place = require('../models/place')
const {validationResult } = require('express-validator')
const HttpError = require('../models/error-model');
const getCoordinate = require('../utils/location');

let DUMMY_PLACES = [
    {
        id:"p1",
        title: "Minar-e-Pakistan",
        coordinates: {
            latitude: 31.5925,
            longitude: 74.3091
        },
        address: "Minar-e-Pakistan, Iqbal Park, Lahore, Punjab, Pakistan",
        description: "Minar-e-Pakistan is a national monument located in Iqbal Park, Lahore. It was built to commemorate the Lahore Resolution passed on 23rd March 1940, which eventually led to the creation of Pakistan. The tower represents a blend of Mughal, Islamic, and modern architecture and is a symbol of national pride.",
        creator:'u1'
    },
    {
        id:"p2",
        title:'Badshahi Mosque',
        description:"The Badshahi Mosque is one of the most iconic and historic landmarks in Lahore. Built in 1673 during the Mughal era by Emperor Aurangzeb, it is one of the largest mosques in the world. Known for its massive courtyard, grand architecture, and red sandstone construction, it is a symbol of Lahore's rich cultural heritage.",
        location:{
            lat:'31.5889',
            lag:'74.3094'
        },
        address:'Badshahi Mosque, Walled City of Lahore, Lahore, Punjab, Pakistan',
        creator:'u1'
    },
]
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
    let places;
    try {
        places = await Place.find({creator:userId})
    } catch (err) {
       const error = new HttpError("Fetching places failed, please try again",500)
        return next(error)
    }
    if(!places || places.length === 0){
        return next(new HttpError("No places found for the provided user ID",404))
    }
    res.json({
        places:places.map((place)=> place.toObject({getters:true}))
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
    try {
        await createdPlace.save()
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

     try {
            await Place.findByIdAndDelete(placeId)
     } catch (error) {
        error = new HttpError('No product found for the provided Id',404)
     }
    res.status(200).json({
        message:"Place has been deleted successfully!",
    })
}

module.exports = {getPlaceById,getPlacesByUserId,createNewPlace,updatePlace,deletePlace}