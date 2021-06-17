const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');



// User model
const User = require('../models/User');

// Login Page
router.get("/login", (req, res, next) => {
    // res.send("Welcome");
    res.render('login')
});

// GET METHOD
router.get("/register", (req, res, next) => {
    res.render('register')
});

// POST METHOD
router.post('/register', function(req, res, next) {
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
                        if(err) throw err;
                        // set passwrd to hashed
                        newUser.password = hash;
                        // save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
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
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
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
