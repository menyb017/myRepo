import React from "react";
import Products from "./products";
import Customers from "./customers";
import Purchases from "./purchases";
import { Route, Routes, Link } from "react-router-dom";
import EditProduct from "./editProduct";
import EditCustomer from "./editCustomer";

export default function Menu() {
  return (
    <div>
      <nav
        style={{
          padding: "5px",
          border: "2px solid black",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/products">
          Products
        </Link>
        <Link style={{ textDecoration: "none" }} to="/customers">
          Customers
        </Link>
        <Link style={{ textDecoration: "none" }} to="/purchases">
          Purchases
        </Link>
      </nav>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/editCustomer/:id" element={<EditCustomer />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}
