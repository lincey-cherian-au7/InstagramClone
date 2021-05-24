const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { JWT_SECRET } = require('../keys')
const User = require('../models/user') 

module.exports =(req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization)
        return res.status(401).send({error:"Please Log In to continue"})
    
    const token = authorization.replace('Bearer ','')
    console.log(token)
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
            return res.status(401).send({error:"You must LogIn to continue."})
        const {_id} = payload
        User.find(_id).then(userData=>{
            req.user = userData
        })
        next()
    })
    

}