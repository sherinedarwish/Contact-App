const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');



// User model
const User = require('../models/User');

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
    // res.send("Welcome");
    res.render('login')
});

// GET METHOD
router.get("/register", forwardAuthenticated, (req, res) => {
    res.render('register')
});

// POST METHOD
router.post('/register', (req, res)=> {
    const { name, email,password,password2 } = req.body;
    let errors =[]

    // check required fields
    if(!name || !email || !password || !password2) {
        errors.push ({ msg: 'Please fill in all fields' });

    }
    // Check passwords match
    if( password !== password2 )
    {
        errors.push({ msg: 'Passwords do not match'});

    }
    // Check password length
    if( password.length < 6)
    {
        errors.push ({ msg:"Password is too short"});
    }
    if (errors.length > 0 )
    {
        res.render('register',{ 
            errors,
            name,
            email,
            password,
            password2
        });
        console.log(errors);
    }
    else
    {
        console.log("validation pass");
        // Validation Pass
        User.findOne({ email:email })
        .then(user => {
            if(user)
            {
                // USER EXISTS
                errors.push({ msg: "Email is already registered"});
                res.render('register',{ 
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else
            {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash Password
                bcrypt.genSalt(10,(err,salt) =>
                    bcrypt.hash(newUser.password , salt , (err, hash) => {
                        console.log("first part of hash");
                        if(err) throw err;
                        // set passwrd to hashed
                        newUser.password = hash;

                        // save user
                        newUser
                            .save()
                            .then(user => {
                                console.log("ok good");
                                res.redirect('/users/login')})
                            .catch(err => console.log(err))
                }))

                // newUser.create([{body}]);
                console.log(newUser);
                
            }
        });
    }
  });

// Login Handle

router.post('/login',(req,res,next)=> {
    console.log(req.body.email, req.body.password)
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        // badRequestMessage: 'Error here',
        failureFlash: true
    })(req, res, next);
});


// Logout Handle

router.get('/logout',(req,res) => {
    req.logout();
    req.flash('sucess_msg', 'You are logged out');
    res.redirect('/users/login');
})
module.exports = router;
