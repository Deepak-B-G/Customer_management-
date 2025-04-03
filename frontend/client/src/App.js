import React from "react";
import CustomerList from "./components/customerList";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        NPK Traders
      </h1>


      {/* Customer List Component */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CustomerList />
      </div>
    </div>
  );
}

export default App;
