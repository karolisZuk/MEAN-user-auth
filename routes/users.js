const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success:false, msg:'Something went wrong. Try again later.'});
        }else {
            res.json({success:true, msg:'User were registered successfully. You can now login.'});
            console.log(`${new Date().toLocaleString() } user, named ${req.body.username} just registered.`);
        }
    }); 
});

router.post('/authenticate', (req, res, next) => {
    console.log(`${new Date().toLocaleString() } User ${req.body.username} just logged in.`);
    
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn:604800 //1 week
                });
                res.json({
                    success: true,
                    token:`JWT  ${token}`,
                    user:{
                        id:user._id,
                        name: user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            } else {
                return res.json({success: false, msg:'Wrong password'});
            }
        })
    })
});

router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    //delete this later, it sends back the password!!!!!!!
    res.json({user: req.user});
});

router.post('/check/if/email/exists', (req, res, next) => {
    User.checkIfEmailIsTaken(req.body.email, (err, result) => {
        if(err) return  res.json({success:false, msg:'Something went wrong. Try again later.'});
        else if(result) return res.json({success:false, msg:'This email is already registered.'});
        else return res.json({success:true});
    })
});

router.post('/check/if/username/exists', (req, res, next) => {
    User.checkIfUsernameIsTaken(req.body.username, (err, result) => {
        if(err) return  res.json({success:false, msg:'Something went wrong. Try again later.'});
        else if(result) return res.json({success:false, msg:'This username is already taken.'});
        else return res.json({success:true});
    })
});



module.exports = router;
