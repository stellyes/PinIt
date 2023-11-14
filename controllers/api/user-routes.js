const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Location, Category } = require("../../models");

// /api/users/ routes

// Get all users
router.get("/",  async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Location }, { model: Category }]
        });

        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get specific user based on ID
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Location }, { model: Category }]
        });

        if (!userData) {
            res.status(404).json({
            message: "ERROR: No user associated with the provided id",
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new user
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update specific user based on ID
router.put("/:id", async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
            id: req.params.id,
            },
        });

        if (!userData) {
            res.status(404).json({
            message: "ERROR: No user associated with the provided id",
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
    
// Delete specific user based on ID
router.delete("/:id", async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
            id: req.params.id,
            },
        });

        if (!userData) {
            res.status(404).json({
            message: "ERROR: No user associated with the provided id",
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login for user
router.post("/login", async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!userData) {
        res
          .status(404)
          .json(
            { 
                code: 404, 
                message: "Login failed. Incorrect email/password" 
        });
        return;
      }

      // Validate password against encrypted version
      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
  
      if (!validPassword) {
        res
          .status(400)
          .json(
            { 
                code: 400, 
                message: "Login failed. Incorrect email/password",
        });
        return;
      }
  
      req.session.save(() => {
        // Set req.session.loggedIn to userData.id so that 
        // home-routes can access locations from logged in user
        req.session.loggedIn = true;
        req.session.user = userData.id;
      });
      
      res
          .status(200)
          .json(
            { 
                code: 200, 
                message: "Login successful" 
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      // Remove req.session.loggedIn
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
    
module.exports = router;
    