import React from "react";
import CustomerInvoice from "./components/customerList";
import TransactionEntryForm from "./components/transaction";

function App() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>NPK Traders</h1>
            <hr style={{ margin: "40px 0" }} />
            <CustomerInvoice />
            {/* Add your components here */}
            <TransactionEntryForm />
        </div>
    );
}

export default App;
