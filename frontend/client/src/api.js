const API_URL = "http://localhost:5000"; // Change when deploying

// Search transactions by customer name or phone
export const searchTransactions = async (query) => {
    const response = await fetch(`${API_URL}/api/transactions/search?query=${query}`);
    if (!response.ok) { 
        throw new Error("Failed to fetch transactions");
    }
    return response.json();
};
