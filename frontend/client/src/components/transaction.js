import React, { useState } from "react";
import { addTransactions } from "../api";

const TransactionEntryForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [transactions, setTransactions] = useState([
        { coconutType: "", coconutPrice: "", coconutsPerBag: "", totalBags: "" }
    ]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (index, field, value) => {
        const newTransactions = [...transactions];
        newTransactions[index][field] = value;
        setTransactions(newTransactions);
    };

    const addTransactionRow = () => {
        setTransactions([...transactions, { coconutType: "", coconutPrice: "", coconutsPerBag: "", totalBags: "" }]);
    };

    const removeTransactionRow = (index) => {
        const newTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(newTransactions);
    };

    const handleSubmit = async () => {
        if (!customerName.trim()) {
            setMessage("Customer name is required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await addTransactions({ customerName, transactions });

            if (res.success) {
                setMessage("Transactions saved successfully!");
                setCustomerName("");
                setTransactions([{ coconutType: "", coconutPrice: "", coconutsPerBag: "", totalBags: "" }]);
            } else {
                setMessage("Failed to save transactions.");
            }
        } catch (error) {
            setMessage("Server error while saving transactions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Add New Transactions</h2>
            <label>Customer Name:</label>
            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <h3>Transactions:</h3>
            {transactions.map((txn, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <input
                        type="text"
                        placeholder="Coconut Type"
                        value={txn.coconutType}
                        onChange={(e) => handleChange(index, "coconutType", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={txn.coconutPrice}
                        onChange={(e) => handleChange(index, "coconutPrice", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Per Bag"
                        value={txn.coconutsPerBag}
                        onChange={(e) => handleChange(index, "coconutsPerBag", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Bags"
                        value={txn.totalBags}
                        onChange={(e) => handleChange(index, "totalBags", e.target.value)}
                    />
                    {transactions.length > 1 && (
                        <button onClick={() => removeTransactionRow(index)}>❌</button>
                    )}
                </div>
            ))}
            <button onClick={addTransactionRow} style={{ marginRight: "10px" }}>
                ➕ Add Row
            </button>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save Transactions"}
            </button>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default TransactionEntryForm;
