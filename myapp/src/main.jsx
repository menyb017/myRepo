import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from "./appReducer.jsx"
import App from "./App.jsx";


const appStore = legacy_createStore(appReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
