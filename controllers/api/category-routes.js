const router = require('express').Router();
const { User, Location, Category } = require("../../models");

// /api/users/ routes

// Get all users
router.get("/",  async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Location }, { model: User }]
        });

        res.status(200).json(categoryData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get specific category based on ID
router.get("/:id", async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Location }, { model: User }]
        });

        if (!categoryData) {
            res.status(404).json({
            message: "ERROR: No category associated with the provided id",
            });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new category
router.post("/", async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update specific category based on ID
router.put("/:id", async (req, res) => {
    try {
        const categoryData = await Category.update(req.body, {
            where: {
            id: req.params.id,
            },
        });

        if (!categoryData) {
            res.status(404).json({
            message: "ERROR: No category associated with the provided id",
            });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});
    
// Delete specific category based on ID
router.delete("/:id", async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
            id: req.params.id,
            },
        });

        if (!categoryData) {
            res.status(404).json({
            message: "ERROR: No category associated with the provided id",
            });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});
    
module.exports = router;
    