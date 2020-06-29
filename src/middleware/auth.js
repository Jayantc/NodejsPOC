const jwt= require('jsonwebtoken')
const User= require('../models/user')

const auth= async(req, res, next)=>{
    try{
        console.log('hi')
        const token= req.header('Authorization').replace('Bearer ','')
        console.log('hi')
        console.log(token)
        console.log(process.env.JWT_SECRET)
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        console.log('hi')
        const user= await User.findOne({_id: decoded._id, 'tokens.token':token})
        console.log('hi')

        if(!user){
            throw new Error()
        }

        req.token=token
        req.user= user
        next()
    }catch(e){
        res.status(401).send({error: 'please authenticate'})
    } 
    
    
}

module.exports= auth