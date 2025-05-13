const bcrypt = require('bcrypt')
const User = require('../models/user')
const {validationResult} = require('express-validator')
const HttpError = require('../models/error-model')
const jwt = require('jsonwebtoken')


const getAllUsers = (req,res,next)=>{
    res.status(200).json({users:usersList})
}

const registerUser = async(req,res,next)=>{
    const {name,email,password} = req.body;
    const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(new HttpError("Invalid input data has passed",422))
      }
      let existingUser;
      try{
        existingUser = await User.findOne({email:email})
      }catch(error){
        return next(new HttpError("Something went wrong while checking user already", 500))

      }
      if(existingUser){
        return next(new HttpError('User Already Exist, please try other email address',422))
      }
      // Generate Salt
      const genSalt =await bcrypt.genSalt(10);
      // Hashing Password
      const hashPassword = await bcrypt.hash(password,genSalt)
    const newUser = new User({
      name,
      email,
      image:"https://static.vecteezy.com/system/resources/thumbnails/052/248/075/small_2x/peacock-feather-wallpaper-hd-wallpaper-photo.jpeg",
      password:hashPassword,
      places:[]
    })
      try {
         await newUser.save() 
      } catch (error) {
        return next(new HttpError("Signing up failed, please try again", 401))
      }
    res.status(201).json({
        user:newUser,
        message:"New User has been created successfully"
    })
}
const loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    let user
    try{
       user = await User.findOne({email:email});
    }catch(error){
      return next(new HttpError("Signing up failed, please try again", 401))
    }
    if(user){
      let comparePassword =await bcrypt.compare(password, user.password)
      if(comparePassword){
        const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:'1d'});
        res.status(200).json({token:token,message:"You have successfully Logged In"})
      }else{
        next(new HttpError('Password does not match',404))
      }
    }else{
      next(new HttpError("User with this email doesn't exist",404))
    }

}

module.exports = {getAllUsers,registerUser,loginUser}