const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontacts = require("../services").getcontacts;
const getcontactsByUser = require("../services").getcontactsByUser;
const editcontact = require("../services").editcontact;
const deletecontact = require("../services").deletecontact;
const Contact = require("../models/Contact");
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res, next) => {
    res.render("index", { title: "Sherine" });
});

// View All Page
router.get("/viewall", ensureAuthenticated, async (req, res) => {
  const data = await getcontactsByUser(req);
  console.log("data from viewall= ",data);
  res.render('viewall',{data: data})
});

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
  const data = await editcontact(req);
  console.log("data from editing= ",data);
  const { first_name, last_name, number } = data;
  console.log("first_name: ", first_name);
  res.render('edit',{data})
});

// delete
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  await deletecontact(req,res);
  
});


module.exports = router;
