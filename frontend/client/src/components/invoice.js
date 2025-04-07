import React, { forwardRef, useRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import "./components.css"; // Your custom CSS

const Invoice = forwardRef(({ transactions }, ref) => {
    // Local ref for the invoice container
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    if (!transactions || transactions.length === 0) return null;

    const total = transactions.reduce((sum, txn) => sum + txn.totalAmount, 0);

    // Convert the displayed HTML to a PDF with doc.html()
    const handleDownloadPdf = () => {
        const element = localRef.current;
        if (!element) return;
    
        const doc = new jsPDF("p", "pt", "a4"); // pt units (1 pt = 1/72 inch)
        const pageWidth = doc.internal.pageSize.getWidth(); // ~595 pt
        // const pageHeight = doc.internal.pageSize.getHeight(); // ~842 pt
    
        doc.html(element, {
            callback: function (doc) {
                doc.save("Transaction_Invoice.pdf");
            },
            x: 10,
            y: 10,
            width: pageWidth - 20, // Leave 10pt margin on both sides
            html2canvas: {
                scale: 0.89, // Slight scale boost for clarity and fitting
                useCORS: true,
            },
        });
    };
    
    return (
        <div>
            {/* 
        This container will be rendered to PDF. 
        Make sure it includes all the styling from your .css file.
      */}
            <div ref={localRef} className="invoice-content">
                {/* Invoice Header */}
                <div className="invoice-header">
                    <div>
                        <h1 className="invoice-title">INVOICE</h1>
                        <p className="invoice-number">
                            Invoice #INV-{new Date().getFullYear()}-001
                        </p>
                    </div>
                </div>

                {/* Bill To Section */}
                <div className="bill-to">
                    <h3>Bill To:</h3>
                    <p>
                        {transactions[0].customer_name}
                        <br />
                        {transactions[0].phone}
                    </p>
                </div>

                {/* Table */}
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
                                    {new Date(txn.date).toLocaleTimeString("en-GB", {
                                        hour12: false,
                                    })}
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

                {/* Totals Section */}
                <div className="totals">
                    <div>
                        <div className="total-row total-bold">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="download-btn">
                <button onClick={handleDownloadPdf}>Download PDF</button>
            </div>
        </div>
    );
});

export default Invoice;
