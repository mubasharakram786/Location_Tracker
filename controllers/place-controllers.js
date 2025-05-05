const { v4: uuidv4 } = require('uuid');
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

const getPlaces = (req,res,next)=>{
    const pid = req.params.pid;
    const place = DUMMY_PLACES.find(place => place.id === pid)

    if(!place){
        throw new HttpError("No place found for the provided place ID",404)
    }

    res.json({place:place})
}

const getPlacesByUserId = (req,res,next)=>{
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(place=>{
        return place.creator === userId
    })
    if(!places || places.length === 0){
        return next(new HttpError("No places found for the provided user ID",404))
    }
    res.json({
        places:places
    })
}

const createNewPlace = async(req,res,next)=>{
  const {title,description,address,creator} = req.body;
  console.log(address,"============Address")
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
  const createdPlace = {
    id:uuidv4(),
    title,
    description,
    location:coordinates,
    address,
    creator
  }

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({
    place:createdPlace
  })

}

const updatePlace = (req,res,next)=>{
    const placeId = req.params.pid;
    const {title,description} = req.body;
    const errors = validationResult(req)
    console.log(errors)
        if(!errors.isEmpty()){
            throw new HttpError("Please add the data in the following fields",422)
        }
    const updatedPlace ={...DUMMY_PLACES.find(place => place.id === placeId)};

    if(!updatedPlace){
        const error = new HttpError('Could not find place for the provided Id',404);
        throw error
    }

    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId)

     updatedPlace.title = title;
     updatedPlace.description = description;

     DUMMY_PLACES[placeIndex] = updatedPlace

    res.status(200).json({
        place:updatedPlace
    })
}


const deletePlace = (req,res,next)=>{
    const placeId = req.params.pid;

    DUMMY_PLACES = DUMMY_PLACES.filter(place=> place.id !== placeId)

    res.status(200).json({
        message:"Place has been deleted successfully!",
        place:DUMMY_PLACES
    })
}

module.exports = {getPlaces,getPlacesByUserId,createNewPlace,updatePlace,deletePlace}