const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontacts = require("../services").getcontacts;
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res, next) => {
    res.render("index", { title: "Sherine" });
});

router.get("/viewall", ensureAuthenticated, async (req, res) => {
  const data = await getcontacts();
  console.log(data);
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
module.exports = router;
