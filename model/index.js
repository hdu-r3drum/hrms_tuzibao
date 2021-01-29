const {user} = require('../modules/mongoose.js')

const express = require("express");

const mongoose = require("mongoose");

const { JsonWebTokenError } = require('jsonwebtoken');

const app = express()

const secret = 'kki3o12pkl4kaf'

app.get('/',async(req,res)=>{

    res.send('ok')

})

app.post('/register',async(req,res)=>{

    const user = await user.create({

        username:req.body.username,
        
        password:req.body.password,

    })

    res.send(user)

})

app.post('/login',async(req,res)=>{

    const user = await user.findOne({

        username:req.body.username

    })
    if(!user){

        return res.status(422).send({

            message:"用户名不存在"

        })

    }
    const isPasswordValid = require('bcrypt').compareSync(req.body.password,user.password)
    
    if(!isPasswordValid){
        
        return res.status(422).send({

            message:'密码错误'

        })
    }

    const jwt = require('jsonwebtoken');

    const token = jwt.sign({
        
        id:string(user._id),

    },secret)

    res.send({

        user,

        token:token,

    })

})

app.get('/users',async (req,res)=>{

    const users = await user.find()

    res.send(users)

})

app.listen(3001,()=>{

    console.log('http://localhost:3001')

})