const express = require('express');
const mongoose = require('mongoose')

const { MONGO_URI }= require('./keys')
const UserModel = require('./models/user')
const authRoute = require('./routes/auth')

const app = express();
const PORT = 8001;

app.use(express.json())
app.use(authRoute)

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log(`Connected to DB`)
})
mongoose.connection.on('error',(err)=>{
    console.log(`error while connecting ${err}`)
})
// app.get('/',(req,res)=>{
//     res.send('Hello to insta clone')
// })

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})