const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Customer = require("../models/Customer");

// POST /api/transactions
router.post("/", async (req, res) => {
    const { customerName, transactions } = req.body;

    try {
        if (!customerName || !transactions || !Array.isArray(transactions)) {
            return res.status(400).json({ success: false, message: "Invalid request body" });
        }

        // Find or create customer
        let customer = await Customer.findOne({ name: customerName });
        if (!customer) {
            customer = new Customer({ name: customerName });
            await customer.save();
        }

        // Prepare transactions with computed fields
        const newTransactions = transactions.map((txn) => {
            const totalPiecesSold = txn.totalBags * txn.coconutsPerBag;
            const totalAmount = totalPiecesSold * txn.coconutPrice;

            return {
                customer: customer._id,
                coconutType: txn.coconutType,
                coconutPrice: txn.coconutPrice,
                coconutsPerBag: txn.coconutsPerBag,
                totalBags: txn.totalBags,
                totalPiecesSold,
                totalAmount,
                date: new Date(),
            };
        });

        await Transaction.insertMany(newTransactions);

        res.status(201).json({ success: true, message: "Transactions saved successfully" });
    } catch (err) {
        console.error("Error in POST /api/transactions:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
