const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function seedTransactions() {
    try {
        await Transaction.deleteMany({}); // Clear existing transactions

        const transactions = await Transaction.insertMany([
            {
                customer: "67ec374c74f69bcb6d2dcc65", // Deepak
                type: "addition",
                coconutType: "Tender Coconut",
                coconutsPerBag: 50,
                totalBags: 10,
                coconutPrice: 15,
            },
            {
                customer: "67ec374c74f69bcb6d2dcc65", // Deepak
                type: "addition",
                coconutType: "Mature Coconut",
                coconutsPerBag: 30,
                totalBags: 10,
                coconutPrice: 20,
            },
            {
                customer: "67ec374c74f69bcb6d2dcc66", // Sai
                type: "addition",
                coconutType: "Dry Coconut",
                coconutsPerBag: 40,
                totalBags: 5,
                coconutPrice: 25,
            }
        ]);

        console.log("Transactions added successfully:", transactions);
    } catch (error) {
        console.error("Error seeding transactions:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedTransactions();
