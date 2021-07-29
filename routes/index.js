const express = require("express");
const router = express.Router();
const createcontact = require("../services").createcontact;
const getcontactsByUser = require("../services").getcontactsByUser;
const getcontact = require("../services").getcontact;
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
    res.render("viewall", { data: data });
});

// Dashboard page
router.get("/dashboard", ensureAuthenticated, (req, res) =>
    res.render("dashboard", {
        name: req.user.name,
    })
);

// POST METHOD
router.post("/dashboard", async function (req, res, next) {
    await createcontact(req, res);
    res.render("dashboard", { name: req.user.name });
});

// Edit
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
    const data = await getcontact(req);
    res.render("edit", { ...data._doc });
});
 
// delete
router.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
    await deletecontact(req, res);
});

module.exports = router;
