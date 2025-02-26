import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // Global Styles
import "./App.css";    // Component Styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
