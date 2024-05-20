import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function EditProduct() {
  const customers = useSelector((store) => store.customers);
  const purchases = useSelector((store) => store.purchases);
  const products = useSelector((store) => store.products);

  const { id } = useParams();
  const dispatch = useDispatch();

  // Retrieve the current product object based on the id
  const currentProduct = products.find(
    (product) => product.id === parseInt(id)
  );

  // Initialize state variables with the initial values
  const [name, setName] = useState(currentProduct ? currentProduct.name : "");
  const [price, setPrice] = useState(
    currentProduct ? currentProduct.price.toString() : ""
  );
  const [quantity, setQuantity] = useState(
    currentProduct ? currentProduct.quantity.toString() : ""
  );
  const [productCustomers, setProductCustomers] = useState([]);

  // Function to update the product
  const updateProduct = () => {
    // Construct the payload with updated values
    const payload = {
      id: parseInt(id), // Ensure id is in the correct format
      name: name.trim() !== "" ? name : undefined, // Include only if changed
      price: parseFloat(price), // Ensure price is in the correct format
      quantity: parseInt(quantity), // Ensure quantity is in the correct format
    };

    // Dispatch the UPDATE_PRODUCT action with the payload
    dispatch({ type: "UPDATE_PRODUCT", payload: payload });
  };

  // Function to delete the product
  const deleteProduct = () => {
    // Dispatch the DELETE_PRODUCT action with the product id
    dispatch({ type: "DELETE_PRODUCT", payload: { id: parseInt(id) } });
  };

  // Filter customers who purchased the product with the specified id
  useEffect(() => {
    const productId = parseInt(id); // Convert id to number type
    const filteredCustomers = customers.filter((customer) =>
      purchases.some(
        (purchase) =>
          purchase.customerId === customer.id &&
          purchase.productId === productId
      )
    );
    setProductCustomers(filteredCustomers);
  }, [id, customers, purchases]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div
        style={{
          border: "2px solid black",
          padding: "10px 20px",
          marginRight: "30px",
        }}
      >
        <h2>Edit product</h2>
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
          <span>ID: {id}</span>
          <br />
          Name:{" "}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={currentProduct ? currentProduct.name : ""}
            type="text"
          />
          <br />
          Price:
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={currentProduct ? currentProduct.price.toString() : ""}
            type="number"
          />
          <br />
          Quantity:{" "}
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={
              currentProduct ? currentProduct.quantity.toString() : ""
            }
            type="number"
          />
        </div>

        <br />
        <br />
        <button onClick={updateProduct}>Update</button>
        <button onClick={deleteProduct}>Delete</button>
      </div>

      {/* Display customers who purchased the product */}
      <div
        style={{
          border: "2px solid black",
          padding: "20px 20px 20px 20px",
        }}
      >
        <h3>Customers who purchased product {id}:</h3>
        <ul>
          {productCustomers.map((customer) => (
            <li key={customer.id} style={{ marginBottom: "10px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/editCustomer/${customer.id}`}
              >
                {customer.fname} {customer.lname}
              </Link>
              - {customer.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
