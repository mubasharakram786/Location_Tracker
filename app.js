const express = require('express')

const bodyParser = require('body-parser')
const HttpError = require('./models/error-model')
const app = express()

const placesRoutes = require('./routes/places-routes')

app.use(express.json())
app.use('/api/places', placesRoutes)

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

app.listen(5000)