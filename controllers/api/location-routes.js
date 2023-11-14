const router = require('express').Router();
const { User, Location, Category } = require("../../models");

// /api/locations/ routes

// Get all locations
router.get("/",  async (req, res) => {
    try {
        const locationData = await Locations.findAll({
            include: [{ model: User }, { model: Category }]
        });

        res.status(200).json(locationData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get specific location based on ID
router.get("/:id", async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
            include: [{ model: User }, { model: Category }]
        });

        if (!locationData) {
            res.status(404).json({
            message: "ERROR: No Location associated with the provided id",
            });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new location
router.post("/", async (req, res) => {
    try {
        const locationData = await Location.create(req.body);
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update specific location based on ID
router.put("/:id", async (req, res) => {
    try {
        const locationData = await Location.update(req.body, {
            where: {
            id: req.params.id,
            },
        });

        if (!locationData) {
            res.status(404).json({
            message: "ERROR: No location associated with the provided id",
            });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});
    
// Delete specific location based on ID
router.delete("/:id", async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
            id: req.params.id,
            },
        });

        if (!locationData) {
            res.status(404).json({
            message: "ERROR: No location associated with the provided id",
            });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});
    
module.exports = router;
    