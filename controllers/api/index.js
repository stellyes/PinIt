const router = require("express").Router();
const locationRoutes = require("./location-routes");
const categoryRoutes = require("./category-routes");
const userRoutes = require("./user-routes");

router.use("/locations", locationRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

module.exports = router;