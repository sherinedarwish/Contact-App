const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontacts = require("../services").getcontacts;
const getcontactsID = require("../services").getcontactsID;

const deletecontact = require("../services").deletecontact;
const Contact = require("../models/Contact");
var ObjectId = require('mongodb').ObjectID; 
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res, next) => {
    res.render("index", { title: "Sherine" });
});

router.get("/viewall", ensureAuthenticated, async (req, res) => {
  const data = await getcontactsID(req);
  res.render('viewall',{data: data})});

// Dashboard page
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name
}));


// POST METHOD
router.post('/dashboard', async function(req, res, next) {
    await createcontact(req,res);
    res.render('dashboard',{name: req.user.name });
  });


// Edit
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  const contact = Contact.findById(req.params._id);
  console.log("contact is ", contact);
  const data = await getcontacts();
  res.render('edit',{data: data })
});





// delete
router.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
  console.log("logging the id of deleted contact" , req.params._id);
  Contact.findByIdAndRemove(req.params._id,{new:true, useFindAndModify:false})
    .then(
      res.redirect("/viewall"))
    .catch(err=> console.error(err));
  
});


module.exports = router;
