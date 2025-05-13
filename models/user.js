const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    image:{
        type:String,
        required:true,
    },
    places:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Places',
        required:true,
    }]
})

module.exports = mongoose.model('Users', userSchema)