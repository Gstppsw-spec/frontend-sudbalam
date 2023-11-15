import React from "react";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import DaftarSelesai from "./DaftarSelesai";

const DataSelesai = () => {
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <DaftarSelesai />
    
<br /><br />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default DataSelesai;
