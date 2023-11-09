const router = require('express').Router();
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
    
module.exports = router;
    