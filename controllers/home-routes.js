const router = require("express").Router();
const { User, Category, Location } = require("../models");

// Login route
router.get('/login', (req, res) => {
    // If user is logged in, redirect to main page
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
});