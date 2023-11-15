import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Topbar from "../component/Topbar";
import Navbar from "../component/Navbar";
import { useRef } from "react";


export const EditPembayaran = () => {
  const { id, nik_alm_1 } = useParams();
  console.log(nik_alm_1)
  const [no_bkp, setNo_bkp] = useState("");
  const [nik_alm, setNik_Alm] = useState("");
  const [nama_alm, setNama_Alm] = useState("");
  const [nik_waris, setNik_Waris] = useState("");
  const [nama_waris, setNama_Waris] = useState("");
  const [bantuan, setBantuan] = useState("");
  const [tlg_pembayaran, setTlg_Pembayaran] = useState("");
  const [products, setProducts] = useState([]);
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();
  const [namaHari, setNamaHari] = useState("");

function handleChange(e) {
  const date = new Date(e.target.value);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const namaHariBaru = new Intl.DateTimeFormat("id-ID", options).format(date);
  setTlg_Pembayaran(e.target.value);
  setNamaHari(namaHariBaru);
}

  const fetchProducts = async () => {
    await axios
      .get(`https://subdomain.sudbalam.com/api/dataterima/${nik_alm_1}`)
      .then(({ data }) => {
        setProducts(data[0]);
        setNo_bkp(data[0].no_bkp);//
        setNamaHari(data[0].tlg_pembayaran);
        setNik_Alm(data[0].nik_alm);//
        setNama_Alm(data[0].nama_alm);//
        setNik_Waris(data[0].nik_waris);
        setNama_Waris(data[0].nama_waris);
        setBantuan(data[0].bantuan);
        // setGambar(data[0].gambar)
      });
  };

  useEffect(() =>{
    fetchProducts();
    }, [])

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (nik_alm.length !== 16 || nik_waris.length !== 16) {
      return (
        <div>
          {Swal.fire({
            icon: "error",
            text: "SILAHKAN CEK KEMBALI NIK ATAU NIK AHLI WARIS",
          })}
        </div>
      );
    } else {
      formData.append("no_bkp", no_bkp);
      formData.append("nik_alm", nik_alm);
      formData.append("nama_alm", nama_alm);
      formData.append("nik_waris", nik_waris);
      formData.append("nama_waris", nama_waris);
      formData.append("tlg_pembayaran", namaHari);
      formData.append("bantuan", bantuan);
      formData.append("nik_alm_1", nik_alm_1);
    }
    const token = localStorage.getItem("token");
    await axios
      .post(`https://subdomain.sudbalam.com/api/editdatapembayaran`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/datapembayaran");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <main className="body">
        <h5 className="judul-pengajuan">
          EDIT DATA PEMBAYARAN {nama_alm} DENGAN NIK{" "}
          {nik_alm}
        </h5>
        <form className="form-pengajuan" onSubmit={createProduct}>
          <div className="form_pertama">
            <div className="form-group">
              <label htmlFor="nama">Nomor BKP</label>
              <input
                className="input"
                placeholder="Nomor BKP"
                type="text"
                value={no_bkp}
                onChange={(event) => {
                  setNo_bkp(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">NIK Almarhum</label>
              <input
                className="input"
                type="text"
                value={nik_alm}
                onChange={(event) => {
                  setNik_Alm(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Nama Almarhum</label>
              <input
                className="input"
                type="text"
                value={nama_alm}
                onChange={(event) => {
                  setNama_Alm(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">NIK Ahli Waris</label>
              <input
                className="input"
                type="text"
                value={nik_waris}
                onChange={(event) => {
                  setNik_Waris(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Nama Ahli Waris</label>
              <input
                className="input"
                type="text"
                value={nama_waris}
                onChange={(event) => {
                  setNama_Waris(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Tanggal Pembayaran</label>
              <input
                className="input"
                type="date"
                value={tlg_pembayaran}
                onChange={handleChange}
                // required
              />
              <p>Hari : {namaHari}</p>
            </div>
            <div className="form-group">
              <label htmlFor="nama">Besar Bantuan</label>
              <input
                className="input"
                placeholder="Besar Bantuan, mis: 1000000"
                type="text"
                value={bantuan}
                onChange={(event) => {
                  setBantuan(event.target.value);
                }}
                required
              />
            </div>
          </div>
          <button className="button" type="submit">
            EDIT
          </button>
        </form>
      </main>
      <br />
      <br />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};
