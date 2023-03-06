import React, { useState } from "react";
import "../style/pengajuan.css";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import axios from "axios";
import { useRef } from "react";

const UpdateDataTerima = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const { nik_alm, id, nama_alm } = useParams();
  const [no_bkp, setNo_Bkp] = useState("");
  const [tlg_pembayaran, setTlg_Pembayaran] = useState("");
  const [bantuan, setBantuan] = useState("");
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const createProduct = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("no_bkp", no_bkp);
    formData.append("tlg_pembayaran", tlg_pembayaran);
    formData.append("bantuan", bantuan);
    formData.append("gambar", fileInput.current.files[0]);
    formData.append("nik_alm", `${nik_alm}`);

    await axios
      .post(`https://subdomain.sudbalam.com/api/dataterima`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/kematian");
        setLoading(false);
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
      <NavbarTeam />
      <main className="body">
        <h5 className="judul-pengajuan">
          TERIMA PENGAJUAN SANTUNAN UANG DUKA DARI {nama_alm} DENGAN NIK {nik_alm} 
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
                  setNo_Bkp(event.target.value);
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
                onChange={(event) => {
                  setTlg_Pembayaran(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Bukti Pembayaran</label>
              <input className="input" type="file" ref={fileInput} />
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
          <button className="button" type="submit" disabled={loading}>
            Terima
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

export default UpdateDataTerima;
