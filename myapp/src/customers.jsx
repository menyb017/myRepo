import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Customers() {
  const date = new Date();
  const formattedDate = moment(date).format("DD/MM/YYYY");
  const randomNum = Math.floor(Math.random() * 900) + 100;
  const dispatch = useDispatch();
  const customers = useSelector((store) => store.customers);
  const purchases = useSelector((store) => store.purchases);
  const products = useSelector((store) => store.products);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDiv = (customerId) => {
    setSelectedCustomerId(customerId);
    setIsDivOpen(true);
  };

  const addProduct = () => {
    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const action = {
      type: "ADD_PURCHASE",
      payload: {
        purchaseId: randomNum,
        productId: parseInt(selectedProduct),
        customerId: selectedCustomerId,
        date: formattedDate,
      },
    };

    console.log("Dispatching ADD_PURCHASE action:", action);
    dispatch(action);

    setIsDivOpen(false);
  };

  console.log("Customers component re-rendered");

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop:"50px" }}>
      <div>
        <div style={{ textAlign: "center"}}>
          <h2>Customers:</h2>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <table border={1}>
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>ID</th>
                <th>Name</th>
                <th>Purchased Product</th>
                <th>Date</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ padding: "5px" }}>{customer.id}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/editCustomer/${customer.id}`}
                    >
                      {customer.fname} - {customer.lname}
                    </Link>
                  </td>
                  <td>
                    <ul
                      style={{
                        padding: "0",
                        margin: "0",
                        listStyleType: "none",
                      }}
                    >
                      {purchases
                        .filter(
                          (purchase) => purchase.customerId === customer.id
                        )
                        .map((purchase, index) => {
                          const product = products.find(
                            (prod) => prod.id === purchase.productId
                          );
                          return (
                            <li
                              key={`purchase-${index}-${customer.id}-${product?.id}`}
                            >
                              {product?.name}
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                  <td>
                    <ul
                      style={{
                        padding: "0",
                        margin: "0",
                        listStyleType: "none",
                      }}
                    >
                      {purchases
                        .filter(
                          (purchase) => purchase.customerId === customer.id
                        )
                        .map((purchase, index) => (
                          <li key={`date-${index}-${customer.id}`}>
                            {purchase.date}
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      style={{ padding: "5px", margin: "5px" }}
                      onClick={() => openDiv(customer.id)}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Div for selecting product */}
      {isDivOpen && (
        <div
          style={{
            textAlign: "center",
            marginTop: "70px",
            border: "2px solid black",
            marginLeft: "20px",
            padding: "10px",
          }}
        >
          <h3>Customer ID: {selectedCustomerId}</h3>
          <select
            value={selectedProduct || ""}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="" disabled>Select Product</option>
            {products.map((product) => (
              <option key={`product-${product.id}`} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button onClick={addProduct}>Add</button>&nbsp;
          <button onClick={() => setIsDivOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
