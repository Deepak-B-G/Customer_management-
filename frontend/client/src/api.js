const API_URL = "http://localhost:5000"; // Change when deploying

// Search transactions by customer name or phone
export const searchTransactions = async (query) => {
    const response = await fetch(`${API_URL}/api/invoice/search?query=${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }
    return response.json();
};

// Add new transactions for a customer
export const addTransactions = async ({ customerName, transactions }) => {
    const response = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerName, transactions }),
    });

    if (!response.ok) {
        throw new Error("Failed to add transactions");
    }

    return response.json();
};

// Add a new customer
export const addCustomer = async ({ name, phone }) => {
    const response = await fetch(`${API_URL}/api/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
    });

    if (!response.ok) {
        throw new Error("Failed to add customer");
    }

    return response.json();
};
