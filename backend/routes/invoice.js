// routes/invoice.js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");

// GET /api/invoice/search?query=...
router.get("/search", async (req, res) => {
    try {
        const query = req.query.query;

        const customers = await Customer.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
            ],
        });

        if (customers.length === 0) {
            return res.status(404).json({ message: "No customers found" });
        }

        const customerIds = customers.map((c) => c._id);

        const transactions = await Transaction.find({ customer: { $in: customerIds } })
            .populate("customer", "name phone")
            .lean();

        const formattedTransactions = transactions.map((txn) => ({
            _id: txn._id,
            customer_name: txn.customer.name,
            phone: txn.customer.phone,
            coconutType: txn.coconutType,
            coconutPrice: txn.coconutPrice,
            coconutsPerBag: txn.coconutsPerBag,
            totalBags: txn.totalBags,
            totalCoconuts: txn.totalBags * txn.coconutsPerBag,
            totalAmount: txn.totalAmount,
            date: txn.date,
        }));

        res.json(formattedTransactions);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
