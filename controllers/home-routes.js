const router = require("express").Router();
const { Location } = require("../models");
const withAuth = require("../utils/withAuth");

// Homepage route
router.get("/", withAuth, async (req, res) => {
  try {
    // Get locations
    const locationData = Location.findAll({
      where: {
        // user_id is stored as req.sessions.loggedIn
        user_id: req.session.loggedIn
      }
    });

    // Map location data
    const locations = locationData.map((location) => location.get({ plain: true }));

    // Render to page
    res.render('dashboard', {
      locations,
      loggedIn: req.session.loggedIn
    });
    
  } catch(err) {
    res.send("<h1>500 Internal Server Error</h1>");
  }
});

// Login route
router.get('/login', (req, res) => {
  try {
    // If user is logged in, redirect to main page
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
  } catch {
    res.send("<h1>500 Internal Server Error</h1>");
  }
});

router.get('/landing', (req, res) => {
  try {
    res.render('landing');
  } catch {
    res.send("<h1>500 Internal Server Error</h1>");
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch {
    res.send("<h1>500 Internal Server Error</h1>");
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch {
    res.send("<h1>500 Internal Server Error</h1>");
  }
});


module.exports = router;
