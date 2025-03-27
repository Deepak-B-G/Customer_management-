import streamlit as st
import pandas as pd
from datetime import datetime

# ✅ Initialize session state variables
def init_session_state():
    if "page" not in st.session_state:
        st.session_state.page = "home"
    if "selected_customer" not in st.session_state:
        st.session_state.selected_customer = None
    if "selected_customer_id" not in st.session_state:
        st.session_state.selected_customer_id = None
    if "selected_phone" not in st.session_state:
        st.session_state.selected_phone = None
    if "transactions" not in st.session_state: 
        st.session_state.transactions = []

# ✅ Function to navigate between pages
def go_to_page(page_name):
    st.session_state.page = page_name

# ✅ Add/Deduct Page
def AddOrDeduct():
    st.title("Add or Deduct Amount")

    # Get customer details
    customer_name = st.session_state.get("selected_customer", "N/A")
    phone_number = st.session_state.get("selected_phone", "N/A")

    st.write(f"**Customer Name:** {customer_name}")
    st.write(f"**Phone Number:** {phone_number}")

    if st.button("Add Amount"):
        go_to_page("add_price")

    if st.button("Back to Home"):
        go_to_page("home")

# ✅ Add Price Page
def add():
    st.title("Enter Price Details")

    # Get customer details
    customer_name = st.session_state.get("selected_customer", "N/A")
    customer_id = st.session_state.get("selected_customer_id", "N/A")
    phone_number = st.session_state.get("selected_phone", "N/A")

    st.write(f"**Customer Name:** {customer_name}")
    st.write(f"**Phone Number:** {phone_number}")

    options = ["Type 1", "Type 2", "Type 3", "Other"]
    coconut_price = st.number_input("Enter Price per Coconut", min_value=0, step=1, format="%d")
    pieces_per_bag = st.number_input("Enter Number of pieces per bag", min_value=0, step=1, format="%d")
    num_bags = st.number_input("Enter Number of Bags", min_value=0, step=1, format="%d")
    coconut_type = st.selectbox("Select the Coconut type", options)

    # If "Other" is selected, show a text input field
    if coconut_type == "Other":
        custom_type = st.text_input("Enter custom coconut type:")
        if custom_type:
            coconut_type = custom_type  

    # ✅ Calculate total price
    total_price = coconut_price * pieces_per_bag * num_bags
    st.write("### **Total Price:** ₹", total_price)

    # ✅ Store the new transaction when button is clicked
    if coconut_price > 0 and pieces_per_bag > 0 and num_bags > 0:
        if st.button("Add Amount"):
            # ✅ Create a transaction record
            transaction = {
                "customer_id": customer_id,
                "customer_name": customer_name,
                "phone": phone_number,
                "Coconut Type": coconut_type,
                "Date & Time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "Coconut Price": coconut_price,
                "Pieces per Bag": pieces_per_bag,
                "Total Bags": num_bags,
                "Total Amount (₹)": total_price,
            }

            # ✅ Append to session state list
            st.session_state.transactions.append(transaction)

            go_to_page("add_amt")
    else:
        st.warning("⚠️ Please enter all values before proceeding.")

    if st.button("Back to Add/Deduct"):
        go_to_page("add_deduct")

# ✅ Add Amount Page
def add_amt():
    st.title("✅ Amount Added Successfully")

    if not st.session_state.transactions:
        st.write("No transactions recorded yet.")
    else:
        # ✅ Get the latest transaction only
        latest_transaction = st.session_state.transactions[-1]  
        df = pd.DataFrame([latest_transaction])  

        # ✅ Display table
        st.table(df)

    if st.button("Back to Add", key="back_to_add"):
        go_to_page("add_price")
    if st.button("Back to Home", key="add_amt_back_home"):
        go_to_page("home")


def invoice():
    st.title(f"📜 Invoice for {st.session_state.selected_customer}")
    st.write(f"📞 Phone Number: {st.session_state.selected_phone}")

    # ✅ Get selected customer ID
    customer_id = st.session_state.selected_customer_id

    # ✅ Filter transactions for this customer
    customer_transactions = [
        t for t in st.session_state.transactions if t.get("customer_id") == customer_id
    ]

    if not customer_transactions:
        st.write("No transactions recorded for this customer.")
    else:
        # ✅ Convert transactions to DataFrame
        df = pd.DataFrame(customer_transactions)

        # ✅ Calculate Total Sum
        total_amount = df["Total Amount (₹)"].sum()

        # ✅ Display table
        st.table(df)

        # ✅ Display Total Sum
        st.write(f"### 🏷️ **Total Amount:** ₹ {total_amount}")

    if st.button("Back to Home", key="invoice_back_home"):
        go_to_page("home")


def add():
    st.title("Enter Price Details")

    # ✅ Retrieve customer details
    customer_name = st.session_state.get("selected_customer", "N/A")
    customer_id = st.session_state.get("selected_customer_id", None)  # ✅ Ensure customer_id is retrieved correctly
    phone_number = st.session_state.get("selected_phone", "N/A")

    st.write(f"**Customer Name:** {customer_name}")
    st.write(f"**Phone Number:** {phone_number}")

    if customer_id is None:
        st.error("❌ Error: No customer selected!")
        return  # ✅ Prevents further execution if no customer is selected

    st.write(f"**Customer ID:** {customer_id}")  # ✅ Debugging: Ensure correct ID is used

    options = ["Type 1", "Type 2", "Type 3", "Other"]
    coconut_price = st.number_input("Enter Price per Coconut", min_value=0, step=1, format="%d")
    pieces_per_bag = st.number_input("Enter Number of pieces per bag", min_value=0, step=1, format="%d")
    num_bags = st.number_input("Enter Number of Bags", min_value=0, step=1, format="%d")
    coconut_type = st.selectbox("Select the Coconut type", options)

    if coconut_type == "Other":
        custom_type = st.text_input("Enter custom coconut type:")
        if custom_type:
            coconut_type = custom_type  

    total_price = coconut_price * pieces_per_bag * num_bags
    st.write("### **Total Price:** ₹", total_price)

    if coconut_price > 0 and pieces_per_bag > 0 and num_bags > 0:
        if st.button("Add Amount"):
            # ✅ Create transaction record with correct customer_id
            transaction = {
                "customer_id": customer_id,  # ✅ Ensure this is added correctly
                "Customer Name": customer_name,  # ✅ Optional, for debugging
                "Coconut Type": coconut_type,
                "Date & Time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "Coconut Price": coconut_price,
                "Pieces per Bag": pieces_per_bag,
                "Total Bags": num_bags,
                "Total Amount (₹)": total_price,
            }

            st.session_state.transactions.append(transaction)

            st.success(f"✅ Transaction added for Customer ID {customer_id}!")
            go_to_page("add_amt")
    else:
        st.warning("⚠️ Please enter all values before proceeding.")

    if st.button("Back to Add/Deduct"):
        go_to_page("add_deduct")


def deduct():
    st.title("Deduct Amount")

    # ✅ Retrieve customer details
    customer_name = st.session_state.get("selected_customer", "N/A")
    customer_id = st.session_state.get("selected_customer_id", None)
    phone_number = st.session_state.get("selected_phone", "N/A")

    st.write(f"**Customer Name:** {customer_name}")
    st.write(f"**Phone Number:** {phone_number}")

    if customer_id is None:
        st.error("❌ Error: No customer selected!")
        return  

    st.write(f"**Customer ID:** {customer_id}")  

    deduct_amount = st.number_input("Enter Amount to Deduct", min_value=0, step=1, format="%d")

    if deduct_amount > 0:
        if st.button("Deduct Amount"):
            # ✅ Create deduction transaction
            transaction = {
                "customer_id": customer_id,  
                "Customer Name": customer_name,
                "Type": "Deduction",
                "Date & Time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "Total Amount (₹)": -deduct_amount,  # Negative for deduction
            }

            # ✅ Append to session state transactions
            st.session_state.transactions.append(transaction)

            st.success(f"✅ ₹{deduct_amount} deducted from {customer_name}'s account!")
            go_to_page("add_amt")
    else:
        st.warning("⚠️ Please enter a valid amount to deduct.")

    if st.button("Back to Add/Deduct"):
        go_to_page("modify")
