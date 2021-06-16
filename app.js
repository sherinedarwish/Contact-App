require("dotenv").config();
const express = require("express");
var path = require('path');
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");


const app = express();
app.use(express.json());


// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('layout','./layout');

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is up and running"));
