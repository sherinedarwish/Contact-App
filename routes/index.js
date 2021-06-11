const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // res.send("Welcome");
    res.render("index", { title: "Sherine" });
});

module.exports = router;
