import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function EditCustomer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);
  const purchases = useSelector((store) => store.purchases);
  const customers = useSelector((store) => store.customers);

  // Retrieve the current customer object based on the id
  const currentCustomer = customers.find(
    (customer) => customer.id === parseInt(id)
  );

  // Initialize state variables with the initial values
  const [fname, setFname] = useState(
    currentCustomer ? currentCustomer.fname : ""
  );
  const [lname, setLname] = useState(
    currentCustomer ? currentCustomer.lname : ""
  );
  const [city, setCity] = useState(currentCustomer ? currentCustomer.city : "");
  const [customerProducts, setCustomerProducts] = useState([]);

  const updateCustomer = () => {
    const updatedCustomer = { id: parseInt(id), fname, lname, city };
    const action = { type: "UPDATE_CUSTOMER", payload: updatedCustomer };
    dispatch(action);
  };

  const deleteCustomer = () => {
    const action = { type: "DELETE_CUSTOMER", payload: parseInt(id) };
    dispatch(action);
  };

  // Filter products associated with the customer
  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      purchases.some(
        (purchase) =>
          purchase.customerId === parseInt(id) &&
          purchase.productId === product.id
      )
    );
    setCustomerProducts(filteredProducts);
  }, [id, products, purchases]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div
        style={{
          border: "2px solid black",
          width: "max-content",
          padding: "20px",
        }}
      >
        <h2>Edit customer:</h2>
        <span>ID: {id}</span>
        <br />
        <input
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          placeholder={currentCustomer ? currentCustomer.fname : ""}
          type="text"
        />
        <br />
          <input
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          placeholder={currentCustomer ? currentCustomer.lname : ""}
          type="text"
        />
        <br />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={currentCustomer ? currentCustomer.city : ""}
          type="text"
        />
        <br />
        <button onClick={updateCustomer}>Update</button>
        <button onClick={deleteCustomer}>Delete</button>

        {/* Display products associated with the customer */}
      </div>
      <div
        style={{
          border: "2px solid black",
          width: "max-content",
          padding: "10px 20px 10px 20px",

          marginLeft: "30px",
        }}
      >
        <h3>Products Associated With Customer {id}:</h3>
        <ul>
          {customerProducts.map((product) => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/editProduct/${product.id}`}
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
