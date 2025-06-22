const mongoose = require('mongoose')


const placeSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,

    },
    images:{
        type:[String],
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
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    }
})

module.exports = mongoose.model('Places', placeSchema)