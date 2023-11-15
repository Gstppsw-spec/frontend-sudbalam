import React from "react";
import Navbar from "../component/Navbar";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import DaftarMasuk from "./DaftarMasuk";

const DataMasuk = () => {
  return (
    <div className="app-container">
      <Topbar />
      <NavbarTeam />
      <DaftarMasuk />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default DataMasuk;
