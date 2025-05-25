const jwt = require('jsonwebtoken')

 function authenticate (req,res,next){
    const token = req.cookies.token
if(!token){
   return res.status(401).json({message:'No token found'})
}

try {
    const decode =  jwt.verify(token , process.env.SECRET_KEY)
    req.userId = decode.id
    next()
} catch (error) {
    return res.status(403).json({message:"invalid or expired token"})
}
}

module.exports = authenticate