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

// Add a new customer
router.post("/", async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ success: false, message: "Name and phone are required." });
    }

    try {
        const existingCustomer = await Customer.findOne({ phone });
        if (existingCustomer) {
            return res.status(400).json({ success: false, message: "Customer with this phone already exists." });
        }

        const customer = new Customer({ name, phone });
        await customer.save();

        res.status(201).json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving customer." });
    }
});

module.exports = router;
