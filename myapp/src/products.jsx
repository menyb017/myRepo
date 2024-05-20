import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  const purchasesAmount = useSelector((store) => store.purchases.length);
  const products = useSelector((store) => store.products);
  const customers = useSelector((store) => store.customers);
  const purchases = useSelector((store) => store.purchases);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="first" style={{ marginRight: "30px" }}>
        <div>
          <h2 style={{ textAlign: "center" }}>Products:</h2>
          {products.map((product, index) => {
            return (
              <div
                key={product.id}
                style={{
                  border: "2px solid black",
                  width: "max-content",
                  margin: "15px",
                  padding: "15px",
                  position: "relative",
                }}
              >
                <ul
                  style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <li>
                    <span>ID:&nbsp;{product.id}</span>
                  </li>
                  <br />
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/editProduct/${product.id}`}
                    >
                      Name: {product.name}
                    </Link>
                  </li>
                  <br />
                  <li> Price: {product.price}$</li>
                  <br />
                  <li> Quantity: {product.quantity}</li>
                  <br />
                  <div
                    className="child"
                    style={{
                      border: "2px solid black",
                      margin: "10px 0",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {purchases
                      .filter((purchase) => purchase.productId === product.id)
                      .map((purchase, index) => {
                        const customer = customers.find(
                          (customer) => customer.id === purchase.customerId
                        );
                        const date = purchase.date;
                        const productUniqueId = purchase.id;

                        if (customer && date) {
                          return (
                            <ul
                              key={`${product.id}_${customer.id}_${index}`}
                              style={{
                                listStyleType: "none",
                                textAlign: "center",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <li style={{ marginBottom: "10px" }}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/editCustomer/${customer.id}`}
                                >
                                  {`${customer.fname} ${customer.lname} - ${date}`}
                                </Link>
                              </li>
                            </ul>
                          );
                        }
                      })}
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="second"
        style={{
          marginTop: "65px",
          border: "2px solid black",
          padding: "10px 20px",
          height: "70px",
        }}
      >
        <h3>total amount of purchases:&nbsp;{purchasesAmount}</h3>
      </div>
    </div>
  );
}
