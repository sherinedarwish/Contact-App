const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontacts = require("../services").getcontacts;


// GET METHOD
router.get("/", (req, res, next) => {
    // res.send("Welcome");
    res.render("index", { title: "Sherine" });
});


// POST METHOD
router.post('/', async function(req, res, next) {
   // console.log(req.body);
    await createcontact(req.body);
    res.render('index', { title: 'Created tasks'});
  });
module.exports = router;
