const { v4: uuidv4 } = require('uuid');
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
   const users = usersList.map(user=>{
        return user
    })
    res.status(200).json({users:users})
}

const registerUser = (req,res,next)=>{
    const {name,email,password} = req.body;
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
    const checkUserExist = usersList.find(user=>user.email === email)
    

}

module.exports = {getAllUsers,registerUser,loginUser}