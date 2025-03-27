import streamlit as st
from navigate import init_session_state, go_to_page, AddOrDeduct, add, add_amt, invoice, deduct

# Initialize session state
init_session_state()
    
# Ensure customer list exists in session state
if "customers" not in st.session_state:
    st.session_state.customers = [
        {"id": 1, "name": "Deepak", "phone": "9741273500"},
        {"id": 2, "name": "Sai", "phone": "8197408387"},
    ]

# Ensure transactions list exists in session state
if "transactions" not in st.session_state:
    st.session_state.transactions = []

# ✅ Function to add a new customer
def add_user():
    with st.form("add_user_form"):
        new_name = st.text_input("Enter Customer Name")
        new_phone = st.text_input("Enter Phone Number")
        submitted = st.form_submit_button("Add Customer")

        if submitted:
            if not new_name or not new_phone:
                st.warning("⚠️ Please enter both name and phone number.")
            elif any(c["phone"] == new_phone for c in st.session_state.customers):
                st.error("❌ This phone number is already registered!")
            else:
                # ✅ Generate Incremental Unique ID
                new_id = max([c["id"] for c in st.session_state.customers], default=0) + 1
                st.session_state.customers.append({"id": new_id, "name": new_name, "phone": new_phone})
                st.success(f"✅ Customer {new_name} added successfully with ID {new_id}!")
                st.rerun()

# Render the correct page based on session state
if st.session_state.page == "home":
    st.title("Praveen's APP")

    col1, col2, col3, col4, col5 = st.columns([1, 2, 2, 1, 1])
    col1.write("**ID**")
    col2.write("**Customer Name**")
    col3.write("**Phone Number**")
    col4.write("**Add/Deduct**")
    col5.write("**View Invoice**")

    for customer in st.session_state.customers:
        col1, col2, col3, col4, col5 = st.columns([1, 2, 2, 1, 1])
        col1.write(customer["id"])
        col2.write(customer["name"])
        col3.write(customer["phone"])

        # ✅ Add/Deduct Button
        if col4.button(f"Modify", key=f"add_deduct_{customer['id']}"):
            st.session_state.selected_customer = customer["name"]
            st.session_state.selected_customer_id = customer["id"]  # ✅ Ensure this is updated
            st.session_state.selected_phone = customer["phone"]
            go_to_page("modify")

        # ✅ View Invoice Button
        if col5.button(f"Invoice", key=f"invoice_{customer['id']}"):
            st.session_state.selected_customer = customer["name"]
            st.session_state.selected_customer_id = customer["id"]
            go_to_page("invoice")

    # ✅ Button to add new customers
    st.write("---")
    st.subheader("➕ Add New Customer")
    add_user()

# ✅ Correct navigation to respective pages
elif st.session_state.page == "modify":
    AddOrDeduct()

elif st.session_state.page == "add_price":
    add()  # ✅ Corrected from `AddOrDeduct()`

elif st.session_state.page == "add_amt":
    add_amt()
    
elif st.session_state.page == "deduct_price":
    deduct()
# ✅ Invoice Page
elif st.session_state.page == "invoice":
    invoice()
