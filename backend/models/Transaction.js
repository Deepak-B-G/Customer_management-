const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    coconutType: { type: String, required: true },
    coconutPrice: { type: Number, required: true },
    coconutsPerBag: { type: Number, required: true },
    totalBags: { type: Number, required: true },
    totalPiecesSold: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    date: { 
        type: String, 
        default: () => new Date().toISOString()  // Stores the date in ISO format
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);
    