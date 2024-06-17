import React from "react";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import DaftarPembayaranTeam from "./DaftarPembayaranTeam";
import { useEffect} from "react";
import { useNavigate } from "react-router";

const DataPembayaranTeam = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "team") {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <Topbar />
      <NavbarTeam />
      <DaftarPembayaranTeam />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default DataPembayaranTeam;
