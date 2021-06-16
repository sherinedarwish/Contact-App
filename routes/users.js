const express = require("express");
const router = express.Router();


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
   // console.log(req.body);
  //  res.render('index');
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
        res.send("pass")
    }
  });

module.exports = router;
