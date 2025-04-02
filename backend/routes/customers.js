// routes/customers.js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET /api/customers – fetch all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers" });
    }
});

module.exports = router;
