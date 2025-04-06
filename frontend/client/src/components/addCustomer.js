import React, { useState } from "react";
import { addCustomer } from "../api"; // Assuming you have this function in your API file

const AddCustomerForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !phone) {
            setMessage("Name and Phone number are required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await addCustomer({ name, phone });

            if (res.success) {
                setMessage("Customer added successfully!");
                setName("");
                setPhone("");
            } else {
                setMessage("Failed to add customer.");
            }
        } catch (error) {
            setMessage("Error adding customer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Add New Customer</h2>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Phone:</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter customer phone number"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save Customer"}
            </button>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default AddCustomerForm;
