const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Customer = require("../models/Customer");

// Search transactions by customer name or phone number
router.get("/search", async (req, res) => {
    try {
        const query = req.query.query;

        // Find the customer matching the name or phone
        const customers = await Customer.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
                { phone: { $regex: query, $options: "i" } }, // Search by phone
            ],
        });

        if (customers.length === 0) {
            return res.status(404).json({ message: "No customers found" });
        }

        // Get customer IDs
        const customerIds = customers.map((c) => c._id);

        // Find transactions for those customers and populate customer details
        const transactions = await Transaction.find({ customer: { $in: customerIds } })
        .populate("customer", "name phone") // ✅ Populate customer details
        .lean(); // Convert to plain objects for modification

        // Add customer name and phone to each transaction response
        const formattedTransactions = transactions.map((txn) => ({
            _id: txn._id,
            customer_name: txn.customer.name, // Extract name from populated data
            phone: txn.customer.phone, // Extract phone from populated data
            coconutType: txn.coconutType,
            coconutPrice: txn.coconutPrice,
            coconutsPerBag: txn.coconutsPerBag,
            totalBags: txn.totalBags,
            totalCoconuts: txn.totalBags * txn.coconutsPerBag, // Calculate total coconuts
            totalAmount: txn.totalAmount,
            date: txn.date,
        }));

        res.json(formattedTransactions);
    } catch (error) {
        console.error("Error searching transactions:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
