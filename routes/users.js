const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontacts = require("../services").getcontacts;



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
router.post('/register', async function(req, res, next) {
    console.log(req.body);
    await createcontact(req.body);
    res.render('index', { title: 'Created tasks'});
  });
module.exports = router;
