const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Insta here')
})

router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body
    if(!email||!password || !name)
        res.status(422).send({error:'Please enter all the fields.'})
    User.findOne({email})
    .then((userData)=>{
        if(userData)
            return res.status(422).send({error:'Email already exist'})
        
        bcrypt.hash(password,15)
        .then((hashPassword)=>{
            const user = new User({
                name,
                email,
                password:hashPassword
            })
            user.save()
            .then((data)=>{
                res.status(200).send({message:'User successfully saved'})
            })
            .catch(err=>{
                console.log(err)
            })

        })
        
    })
    .catch(err=>{
        console.log(err)
    })
        






})

module.exports = router;