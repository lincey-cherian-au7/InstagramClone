const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const router = express.Router()
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

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

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
        return res.status(422).send({message:'Please provide the credentials'})
    User.findOne({email})
    .then(userData=>{
        if(!userData)
            return res.status(422).send({error:"Invalid Login Credentials"})
        bcrypt.compare(password,userData.password)
        .then(success=>{
            if(success){
                //return res.status(200).send({message:'Sucessfully SignedIn'})
                const token = jwt.sign({_id:userData._id},JWT_SECRET)
                res.json({token})
            }else{
                return res.status(422).send({error:'Invalid Credentials'})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router;