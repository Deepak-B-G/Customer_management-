import React, { useState, useRef } from "react";
import { searchTransactions } from "../api";
import html2pdf from "html2pdf.js";
import Invoice from "./invoice"; // import the new component
import "./components.css";

const CustomerInvoice = () => {
    const [query, setQuery] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const printRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setTransactions([]);

        try {
            const data = await searchTransactions(query);
            if (!data || data.length === 0) {
                setError("No transactions found.");
            } else {
                setTransactions(data);
            }
        } catch (error) {
            setError("User not found!");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPdf = () => {
        const element = printRef.current;
        if (!element) return;

        const options = {
            margin: 10,
            filename: "Transaction_Invoice.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="invoice-container">
            <div className="invoice-card">
                <h2 className="title">Search Transactions</h2>
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
                    <>
                        <Invoice transactions={transactions} ref={printRef} />
                        <div className="download-btn">
                            <button onClick={handleDownloadPdf}>Download PDF</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomerInvoice;
