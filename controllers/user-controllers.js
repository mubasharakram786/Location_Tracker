const User = require('../models/user')
const {validationResult} = require('express-validator')
const HttpError = require('../models/error-model')

const usersList = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "qwerty456"
    },
    {
      name: "Ali Khan",
      email: "ali@example.com",
      password: "pakistan789"
    },
    {
      name: "Maria Garcia",
      email: "maria@example.com",
      password: "maria2024"
    },
    {
      name: "Chen Wei",
      email: "chen@example.com",
      password: "china321"
    }
  ];
  


const getAllUsers = (req,res,next)=>{
    res.status(200).json({users:usersList})
}

const registerUser = async(req,res,next)=>{
    const {name,email,password,places} = req.body;
    const errors = validationResult(req)
      if(!errors.isEmpty()){
        throw new HttpError("Invalid input data has passed",422)
      }
      let existingUser;
      try{
       existingUser = await User.findOne({email:email})
      }catch(error){
        return next(new HttpError("Could not add user as email already exists", 401))

      }

    const newUser = new User({
      name,
      email,
      image:"https://static.vecteezy.com/system/resources/thumbnails/052/248/075/small_2x/peacock-feather-wallpaper-hd-wallpaper-photo.jpeg",
      password,
      places
    })
      try {
        newUser = await newUser.save() 
      } catch (error) {
        return next(new HttpError("Signing up failed, please try again", 401))
      }
    res.status(201).json({
        user:newUser,
        message:"New User has been created successfully"
    })
}
const loginUser = (req,res,next)=>{
    const {email,password} = req.body;
    const identifiedUser = usersList.find(user=>user.email === email)
    
    if(!identifiedUser || identifiedUser.password !== password){
      throw new HttpError("Could not find the user for the provided email and password", 401)
    }
    res.status(200).json({message:"You have successfully Login"})

}

module.exports = {getAllUsers,registerUser,loginUser}