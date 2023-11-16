require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('express-flash');
const passport = require('./passport');
// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const User = require('./models/User')
const clc = require("cli-color");
const routes = require('./routes');


const { PORT, SESSION_SECRET, MONGODB_URI } = process.env

const app = express();

// Set up MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
  secret: SESSION_SECRET,
  name: 'The Food Cartel LU',
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({ mongoUrl: MONGODB_URI }),
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 12,
    maxAge: 1000 * 60 * 60 * 12,
  },
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser())

app.use(flash());

// Middleware to make the currently logged-in user data available globally to views
app.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

app.listen(PORT, () => {
  console.log(clc.bgBlueBright(` ✔ Server started on port http://localhost:${PORT} `));
});

// Mount routes
app.use('/', routes);
