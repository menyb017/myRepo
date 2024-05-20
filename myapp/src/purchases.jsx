import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Purchases() {

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const products = useSelector((store) => store.products);
  const customers = useSelector((store) => store.customers);
  const purchases = useSelector((store) => store.purchases);

  useEffect(() => {
    // Initialize search results with all customers and products
    const initialResults = purchases.map((purchase) => {
      const customer = customers.find(
        (cust) => cust.id === purchase.customerId
      );
      const product = products.find((prod) => prod.id === purchase.productId);
      console.log({customer, product, purchase});
      return { customer, product, purchase };
    });
    setSearchResults(initialResults);
  }, [products, customers, purchases]);

  const handleSearch = () => {
    let filteredResults = purchases;

    if (selectedProduct) {
      filteredResults = filteredResults.filter(
        (purchase) => purchase.productId === parseInt(selectedProduct)
      );
    }

    if (selectedCustomer) {
      filteredResults = filteredResults.filter(
        (purchase) => purchase.customerId === parseInt(selectedCustomer)
      );
    }

    if (searchDate) {
      // Convert searchDate to the format dd/mm/yyyy
      const [year, month, day] = searchDate.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      filteredResults = filteredResults.filter(
        (purchase) => purchase.date === formattedDate
      );
    }

    const filteredData = filteredResults.map((purchase) => {
      const customer = customers.find(
        (cust) => cust.id === purchase.customerId
      );
      const product = products.find((prod) => prod.id === purchase.productId);
      return { customer, product, purchase };
    });

    setSearchResults(filteredData);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div>
          <h2>Purchases</h2>
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
                <th>Customer name</th>
                <th>Product name</th>
                <th>Purchase date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>
                    {result.customer
                      ? `${result.customer.fname} ${result.customer.lname}`
                      : ""}
                  </td>
                  <td>{result.product ? result.product.name : ""}</td>
                  <td>{result.purchase ? result.purchase.date : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="" disabled>
            Select product
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        &nbsp;
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="" disabled>
            Select customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.fname} {customer.lname}
            </option>
          ))}
        </select>
        &nbsp;
        <input
          style={{ marginTop: "20px" }}
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <br />
        <button style={{ marginTop: "30px" }} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
