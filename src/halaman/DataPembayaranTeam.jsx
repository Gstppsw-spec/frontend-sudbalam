import React from "react";
import Navbar from "../component/Navbar";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import DaftarPembayaranTeam from "./DaftarPembayaranTeam";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DataPembayaranTeam = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "team") {
      navigate("/login");
      return;
    }

    setIsAuthenticated(true);
  }, []);

  return (
    <div className="app-container">
      <Topbar />
      <NavbarTeam />

      <DaftarPembayaranTeam />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default DataPembayaranTeam;
