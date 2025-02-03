const express = require("express");
const router = express.Router();
const Restaurant = require("../config/models/Restaurant");

// 1. Get all restaurants
router.get("/", async (req, res) => {
    console.log("GET /restaurants called");  // Debug log
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        console.error("Error fetching restaurants:", err);
        res.status(500).json({ message: err.message });
    }
});

// 2. Get restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ cuisines: req.params.cuisine });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Get restaurants sorted by restaurant_id (ASC/DESC)
router.get("/", async (req, res) => {
    try {
        const sortBy = req.query.sortBy === "DESC" ? -1 : 1;
        const restaurants = await Restaurant.find()
            .select("restaurant_id cuisines name city")
            .sort({ restaurant_id: sortBy });

        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Get restaurants where cuisines=Delicatessen and city!=Brooklyn
router.get("/Delicatessen", async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisines: "Delicatessen",
            city: { $ne: "Brooklyn" }
        })
        .select("cuisines name city")
        .sort({ name: 1 });

        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
