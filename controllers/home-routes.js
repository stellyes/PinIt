const router = require("express").Router();
const { User, Category, Location } = require("../models");

// Render homepage and direct user to proper page based
// on whether the user is logged in or not
router.get("/", async (req, res) => {
    try {
        // If user isn't logged in, send to landing page
        if(!req.session.loggedIn) {
            res.render("landing");
            return;
        } else {
            const locationData = await Location.findAll({
                where: {

                }
            })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    // If user is logged in, redirect to main page
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
});