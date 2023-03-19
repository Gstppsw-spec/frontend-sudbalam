import React from "react";
import "../style/widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Widget = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredBulan, setFilteredBulan] = useState([]);
  const [filteredTanggal, setFilteredTanggal] = useState([]);
  const [filteredTahun, setFilteredTahun] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .get(`https://subdomain.sudbalam.com/api/dataterima`)
      .then(({ data }) => {
        setProducts(data);
        setIsLoaded(true);
        // console.log(new Date(data[500].tlg_pembayaran).getFullYear())
        // console.log(data[500].tlg_pembayaran)
        const tahun = 2023;
        const subsetArray = data.filter(
          (element) => new Date(element.tlg_pembayaran).getFullYear() !== tahun
        );
        console.log(subsetArray);
      });
  };

  const tahun = new Date().getFullYear();
  const month = new Date().getMonth();
  const tanggal = new Date().getDate();

  useEffect(() => {
    setFilteredTahun(
      products.filter(
        (product) => new Date(product.tlg_pembayaran).getFullYear() === tahun
      )
    );
  }, [products]);

  useEffect(() => {
    setFilteredBulan(
      products.filter(
        (product) =>
          new Date(product.tlg_pembayaran).getMonth() === month &&
          new Date(product.tlg_pembayaran).getFullYear() === tahun
      )
    );
  }, [products]);

  useEffect(() => {
    setFilteredTanggal(
      products.filter(
        (product) =>
          new Date(product.tlg_pembayaran).getDate() === tanggal &&
          new Date(product.tlg_pembayaran).getMonth() === month &&
          new Date(product.tlg_pembayaran).getFullYear() === tahun
      )
    );
  }, [products]);

  let data;

  switch (type) {
    case "jumlah_kematian":
      data = {
        title: "JUMLAH PENCAIRAN DANA SEPANJANG WAKTU",
        isMoney: false,
        amount: products.length,
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
        amount: products.length * 1000000,
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
        amount: filteredTahun.length,
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
        amount: filteredBulan.length,
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
        amount: filteredTanggal.length,
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

  if (!isLoaded) {
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
