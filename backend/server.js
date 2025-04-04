// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

    // Import Routes
const customerRoutes = require("./routes/customers");
const invoice = require("./routes/invoice");// ✅ Add this
const transactionRoutes = require("./routes/transactions");

// Use Routes
app.use("/api/customers", customerRoutes);
app.use("/api/invoice", invoice);// ✅ Add this
app.use("/api/transactions", transactionRoutes); // ✅ Add this
    

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
