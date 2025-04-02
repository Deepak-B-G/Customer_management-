// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:5000", // update this to your backend URL when deploying
// });


export const searchTransactions = async (query) => {
    const response = await fetch(`http://localhost:5000/api/transactions/search?query=${query}`);
    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }
    return response.json(); // Ensure response is JSON
};
// You can add more functions here for other endpoints.
