import React from "react";
import "../style/widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useDashboardQuery } from "../api/dashboard/useDashboardQuery";

const Widget = ({ type }) => {

  const { data: dataDashboard, isLoading, isError } = useDashboardQuery();
  
  let data;

  switch (type) {
    case "jumlah_kematian":
      data = {
        title: "JUMLAH PENCAIRAN DANA SEPANJANG WAKTU",
        isMoney: false,
        amount: dataDashboard?.jumlahpencairan
          ? dataDashboard?.jumlahpencairan
          : 0,
        isJumlah: true,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "anggaran_kematian":
      data = {
        title: "ANGGARAN DANA SANTUNAN KEMATIAN KELUAR SEPANJANG WAKTU",
        isMoney: true,
        amount: dataDashboard?.jumlahdana
          ? (dataDashboard?.jumlahdana).toLocaleString("id-ID")
          : 0,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "kematian_tahun":
      data = {
        title: "JUMLAH DISALURKAN TAHUN INI",
        isMoney: false,
        isJumlah: true,
        amount: dataDashboard?.tahun ? dataDashboard?.tahun : 0,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "kematian_bulan":
      data = {
        title: "JUMLAH DISALURKAN BULAN INI",
        isMoney: false,
        isJumlah: true,
        amount: dataDashboard?.bulan ? dataDashboard?.bulan : 0,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "kematian_Hari":
      data = {
        title: "JUMLAH DISALURKAN HARI INI",
        isMoney: false,
        isJumlah: true,
        amount: dataDashboard?.hari ? dataDashboard?.hari : 0,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  if (isLoading) {
    return <div className="loading-widget"></div>;
  } else {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "Rp. "} {data.amount}
            {data.isJumlah && " Data"}
          </span>
          <span className="link"></span>
        </div>
        <div className="right">
          <div className="percentage positive"></div>
          {data.icon}
        </div>
      </div>
    );
  }
};

export default Widget;
