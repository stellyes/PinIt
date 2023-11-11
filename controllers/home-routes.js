const router = require("express").Router();
const { User, Category, Location } = require("../models");
const withAuth = require("../utils/withAuth");

// Homepage route
router.get("/", withAuth, async (req, res) => {
  try {
    // Get locations
    const locationData = Location.findAll();

    // Map location data
    const locations = locationData.map((location) => location.get({ plain: true }));

    // Render to page
    res.render('dashboard', {
      locations,
      loggedIn: req.session.loggedIn
    });
    
  } catch(err) {
    res.status(500).json(err);
  }
})

// Login route
router.get('/login', (req, res) => {
    // If user is logged in, redirect to main page
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
});