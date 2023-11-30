    // const express = require('express');
    // const mongoose = require('mongoose');
    // const dotenv = require('dotenv');
    import express from 'express';
    import dotenv from 'dotenv';
    import mongoose from 'mongoose';
    import { MONGO_URL} from './connect/connect.js'
    import {User} from './models/User.js'
    import jsonwebtoken from 'jsonwebtoken'
    import cors from 'cors';


    const app = express();
    // app.use(cors({
    //     credentials:true;

    // }));

    dotenv.config();
    const jwtsecret = process.env.JWT_SECRET

        


    // const PORT = 6900;

    app.get('/test', (req, res) => {
   return res.json('test ok');
    });
    
    app.post('/Register', async (req, res) => {
        const {username, password} = req.body;
   const createdUser= await User.create({username, password});
    jsonwebtoken.sign({userId : createdUser._id}, jwtsecret, (err, token) =>{
        if(err) throw err;
        res.cookie('token', token).status(201).json('ok');
});
   
});


    // app.listen(process.env.PORT, ()=>{
    //     console.log(`App is listening on ${process.env.PORT} `)
    // });

    mongoose.connect(MONGO_URL).then(()=>{
        console.log('App is connected to database')
        app.listen(process.env.PORT, () =>{
            console.log(`App is listening to port ${process.env.PORT}`)
        })
    }).catch((error) =>{
        console.log(error);
    })

