const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

const User = require("../models/User");

// Login Page
<<<<<<< Updated upstream
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
=======
router.get("/login", forwardAuthenticated, (req, res) => {
    // res.send("Welcome");
    res.render('login')
});


// GET METHOD
router.get("/register", forwardAuthenticated, (req, res) => {
    res.render('register')
});
>>>>>>> Stashed changes

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
    res.render("register")
);

// Register
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
<<<<<<< Updated upstream

    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
=======
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
                        
                        if(err) throw err;
                        // set passwrd to hashed
                        newUser.password = hash;

                        // save user
                        newUser
                            .save()
                            .then(user => {
                                res.redirect('/users/login')})
                            .catch(err => console.log(err))
                }))

                // newUser.create([{body}]);
                console.log(newUser);
                
            }
        });
>>>>>>> Stashed changes
    }

    if (errors.length > 0) {
        res.render("register", { errors, name, email, password, password2 });
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    errors.push({ msg: "Email already exists" });
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                    });
                } else {
                    const newUser = new User({ name, email, password });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then((user) => {
                                    req.flash(
                                        "success_msg",
                                        "You are now registered and can log in"
                                    );
                                    res.redirect("/users/login");
                                })
                                .catch((e) => console.log(e));
                        });
                    });
                }
            })
            .catch((e) => console.log(e));
    }
});

<<<<<<< Updated upstream
// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
=======
router.post('/login',(req,res,next)=> {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
>>>>>>> Stashed changes
    })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
});

module.exports = router;
