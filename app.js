const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const HttpError = require('./models/error-model')
const app = express()

const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/user-routes')
app.use(express.json())
app.use('/api/places', placesRoutes)
app.use('/api/user', userRoutes)
// In case of no route match
app.use((req,res,next)=>{
    const error = new HttpError('Could not found the route', 404)
    throw error
})

app.use((err,req,res,next)=>{
    if(res.headerSent){
        return next(err)
    }
    console.log(err)
    res.status(err.statusCode || 500);
    res.json({
        message: err.message || 'An unknown error occurred!'
    })

})
mongoose.connect('mongodb+srv://mubashar_akram:location_trace_2025@cluster0.7d9ibiq.mongodb.net/BrowseLocations').then(()=>{
    console.log("DB Connected")
    app.listen(process.env.PORT)
}).catch(err=> {
    console.log(err)
})