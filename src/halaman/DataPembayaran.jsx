import React from "react";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import DaftarPembayaran from "./DaftarPembayaran";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DataPembayaran = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

  }, [navigate]);
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />

      <DaftarPembayaran />
      <br />
      <br />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default DataPembayaran;
