const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function (v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // regex for email
            },
            message: props => `${props.value} is not a valid email!`
          }
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
    places:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Users', userSchema)