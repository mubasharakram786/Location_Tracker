const cloudinary = require('cloudinary').v2

const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'upload',
        allowed_formats:['jpg,png,jpeg'],
        transformation:[{width:150,height:150,crop:'limit'}],
    },
});

module.exports = {cloudinary,storage}