const mongoose = require('mongoose')


const placeSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    location:{
        lat:{
            type:Number,
            required:true
        },
        lon:{
            type:Number,
            required:true
        }
    },
    creator:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Places', placeSchema)