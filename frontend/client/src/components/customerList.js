import React, { useState } from "react";
import { searchTransactions } from "../api";
import "./customerList.css"; // Import styling

const CustomerList = () => {
    const [query, setQuery] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await searchTransactions(query);
            if (data.length === 0) {
                setError("No transactions found.");
            }
            setTransactions(data);
        } catch (error) {
            setError("Error fetching transactions.");
            console.error("Error fetching transactions", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-center">Search Transactions</h2>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter name or phone number"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {transactions.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Coconut Type</th>
                            <th>Coconut Price</th>
                            <th>No. of Coconuts Per Bag</th>
                            <th>No. of Bags</th>
                            <th>Total Coconuts</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => {
                            return (
                                <tr key={txn._id}>
                                    <td>{txn.customer_name || "N/A"}</td>  {/* ✅ Use customer_name from response */}
                                    <td>{txn.phone || "N/A"}</td> {/* ✅ Use phone from response */}
                                    <td>{txn.coconutType}</td>
                                    <td>{txn.coconutPrice}</td>
                                    <td>{txn.coconutsPerBag}</td>
                                    <td>{txn.totalBags}</td>
                                    <td>{txn.totalCoconuts}</td>
                                    <td>{txn.totalAmount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerList;
