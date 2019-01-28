// Requiring NPM Packages
// ============================
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
// const passport = require('passport');
// ============================
// Declare all variables 
// ============================
const port = process.env.PORT || 3001;
const db = require("./config/keys").MongoURI;
const app = express();
const routes = require("./routes");
const passport = require("./config/passport");
// ============================
// Set up database using Mongoose
// ============================
mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser:true})
  .then(() => console.log('Success! You are connected to MLAB'))
  .catch(err => console.log('Uh-oh! Mongo Connection error \n' + err))
// =============================
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//  Middleware 
// =============================
// Morgan - used to log errors
app.use(logger('dev'));
// Cookie Parser - manage browser cookies
app.use(cookieParser());
// Body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use sessions to keep track of our user's login status
app.use(session({ secret: "shh secret", resave: true, saveUninitialized: true }));
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Express server needs to listen to routes
app.use(routes);
// Connect flash to send users status messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})
// ===============================
// Error handlers
// ===============================
// Development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: err
      });
  });
}
// Production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: {}
  });
});
// ================================
// Syncing Database & then start server
app.listen(port, () => console.log(`Listening on port ${port}`));
 