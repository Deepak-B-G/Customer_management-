import React ,  {useState} from "react";
import CustomerInvoice from "./components/customerList";
import TransactionEntryForm from "./components/transaction";
import AddCustomerForm from "./components/addCustomer";
function App() {
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [addTransactions, setaddTransactions] = useState(false);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>NPK Traders</h1>
            <hr style={{ margin: "40px 0" }} />

            <CustomerInvoice />

            <div style={{ textAlign: "center", margin: "20px" }}>
                <button onClick={() => setShowAddCustomer((prev) => !prev)}>
                    {showAddCustomer ? "Close" : "➕ Add New Customers"}
                </button>
            </div>

            {showAddCustomer && <AddCustomerForm />}

            <div style={{ textAlign: "center", margin: "20px" }}>
                <button onClick={() => setaddTransactions((prev) => !prev)}>
                    {addTransactions ? "Close" : "➕ Add New Transactions"}
                </button>
            </div>

            {addTransactions && <TransactionEntryForm />}
        </div>
    );
}

export default App;
