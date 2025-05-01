const { v4: uuidv4 } = require('uuid');
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

const registerUser = (req,res,next)=>{
    const {name,email,password} = req.body;
    const errors = validationResult(req)
      if(!errors.isEmpty()){
        throw new HttpError("Invalid input data has passed",422)
      }
      const checkAlreadyExist = usersList.find(user=> user.email === email)

      if(checkAlreadyExist){
        throw new HttpError("Could not add user as email already exists", 401)
      }

    const newUser = {
        id:uuidv4(),
        name,
        email,
        password
    }
    usersList.push(newUser);
    res.status(201).json({
        user:newUser
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