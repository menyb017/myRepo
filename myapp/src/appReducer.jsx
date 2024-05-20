function appReducer(
  store = {
    products: [
      { id: 1, name: "Bamba", price: 12, quantity: 40 },
      { id: 2, name: "Bisli", price: 10, quantity: 5 },
    ],
    customers: [
      { id: 1, fname: "moshe", lname: "levi", city: "jerusalem" },
      { id: 2, fname: "dana", lname: "cohen", city: "ashdod" },
    ],
    purchases: [
      { purchaseId: 123, productId: 1, customerId: 1, date: "22/01/2024" },
      { purchaseId: 345, productId: 2, customerId: 2, date: "01/06/2022" },
      { purchaseId: 444, productId: 2, customerId: 1, date: "07/11/2013" },
      { purchaseId: 456, productId: 1, customerId: 2, date: "15/03/2023" },
    ],
  },

  action
) {
  switch (action.type) {
    case "UPDATE_CUSTOMER":
      const updatedCustomerIndex = store.customers.findIndex(
        (user) => user.id === action.payload.id
      );
      if (updatedCustomerIndex !== -1) {
        const updatedCustomer = {
          ...store.customers[updatedCustomerIndex],
          ...action.payload,
        };
        if (!action.payload.fname?.trim())
          updatedCustomer.fname = action.payload.fname;

        if (!action.payload.lname?.trim())
          updatedCustomer.lname = action.payload.lname;

        if (!action.payload.city?.trim())
          updatedCustomer.city = action.payload.city;

        const customersCopy = [...store.customers];

        customersCopy[updatedCustomerIndex] = updatedCustomer;

        return { ...store,  customers: customersCopy };
      }

    case "DELETE_CUSTOMER":  
      const customerToDeleteIndex = store.customers.findIndex(
        (customer) => customer.id === action.payload
      );

      if (customerToDeleteIndex !== -1) {
        const customersCopy2 = [...store.customers];
        customersCopy2.splice(customerToDeleteIndex, 1);
        return { ...store, customers: customersCopy2 };
      } else {
        alert("customer not found!");
        return store;
      }
    case "UPDATE_PRODUCT":
      const updatedProductIndex = store.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (updatedProductIndex !== -1) {
        const updatedProduct = {
          ...store.products[updatedProductIndex],
          ...action.payload,
        };

        if (action.payload.name !== undefined && action.payload.name !== null)
          updatedProduct.name = action.payload.name;

        if (action.payload.price !== undefined && action.payload.price !== null)
          updatedProduct.price = action.payload.price;

        if (
          action.payload.quantity !== undefined &&
          action.payload.quantity !== null
        )
          updatedProduct.quantity = action.payload.quantity;
        const productsCopy = [...store.products];

        productsCopy[updatedProductIndex] = updatedProduct;

        return { ...store, products: productsCopy };
      }

    case "DELETE_PRODUCT":
      const producToDeleteIndex = store.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (producToDeleteIndex !== -1) {
        const productsCopy2 = [...store.products];
        productsCopy2.splice(producToDeleteIndex, 1);
        return { ...store, products: productsCopy2 };
      } else {
        alert("product not found!");
        return store;
      }

    case "ADD_PURCHASE":
      // const storeCopy = { ...store };
      // const purchasesCopy = [...store.purchases, action.payload];
      // storeCopy.purchases = purchasesCopy;

      return { ...store, purchases: [...store.purchases, action.payload] };

    default:
      return store;
  }
}

export default appReducer;
