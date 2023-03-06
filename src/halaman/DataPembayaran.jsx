import React from "react";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import DaftarPembayaran from "./DaftarPembayaran";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DataPembayaran = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    setIsAuthenticated(true);
  }, []);
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />

      <DaftarPembayaran />
      <br /><br /><br />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default DataPembayaran;
