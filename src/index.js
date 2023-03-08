import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import './style/listData.css'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



createRoot(
  document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
