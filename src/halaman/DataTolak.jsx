import React from "react";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import DaftarTolak from "./DaftarTolak";

const DataTolak = () => {
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <DaftarTolak />
      <br /><br />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default DataTolak;