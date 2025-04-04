import React, { useState } from "react";
import { searchTransactions } from "../api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./customerList.css";

const CustomerInvoice = () => {
    const [query, setQuery] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const printRef = React.useRef(null);

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
            setError("Error fetching transactions.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 3, useCORS: true });
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imageData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
        pdf.save("Transaction_Invoice.pdf");
    };

    const total = transactions.reduce((sum, txn) => sum + txn.totalAmount, 0);

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
                    <div ref={printRef} className="invoice-content">
                        <div className="invoice-header">
                            <div>
                                <h1 className="invoice-title">INVOICE</h1>
                                <p className="invoice-number">Invoice #INV-{new Date().getFullYear()}-001</p>
                            </div>
                        </div>
                        <div className="bill-to">
                            <h3>Bill To:</h3>
                            <p>{transactions[0].customer_name}<br />{transactions[0].phone}</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Unit Price</th>
                                    <th>Coconuts per Bag</th>
                                    <th>Number of Bags</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, index) => (
                                    <tr key={index}>
                                        <td>
                                        {new Date(txn.date).toLocaleDateString("en-GB")}{" "}
                                        {new Date(txn.date).toLocaleTimeString("en-GB", { hour12: false })}
                                        </td>
                                        <td>{txn.coconutType}</td>
                                        <td>₹{txn.coconutPrice.toFixed(2)}</td>
                                        <td>{txn.coconutsPerBag}</td>
                                        <td>{txn.totalBags}</td>
                                        <td>{txn.totalCoconuts}</td>
                                        <td>₹{txn.totalAmount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="totals">
                            <div>
                                <div className="total-row total-bold">
                                    <span>Total:</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {transactions.length > 0 && (
                    <div className="download-btn">
                        <button onClick={handleDownloadPdf}>Download PDF</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerInvoice;
