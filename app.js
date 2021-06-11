require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "views/layout");

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/", indexRouter);

app.listen(PORT, () => console.log("Server is up and running"));
