require("dotenv").config();
const express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.use(express.json());

//Passport config
require('./config/passport')(passport);


// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layout");

// Body Parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("sucess_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
// MongoDB
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected DB"))
    .catch((err) => console.log(err));

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });
  
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });
  
module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
