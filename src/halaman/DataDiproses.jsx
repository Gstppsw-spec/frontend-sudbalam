import React from "react";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import DaftarProses from "./DaftarProses";

const DataDiproses = () => {
  return (
    <div className="app-container">
      <Topbar />
      <NavbarTeam />

      <DaftarProses />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default DataDiproses;
