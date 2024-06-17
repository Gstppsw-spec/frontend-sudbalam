import React, { useState } from "react";
import "../style/pengajuan.css";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import NavbarTeam from "../component/NavbarTeam";
import Topbar from "../component/Topbar";
import axios from "axios";

const UpdateDataTolak = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const { nik_alm, id, nama_alm } = useParams();
  const [keterrangan, setKeterrangan] = useState("");
  const [loading, setLoading] = useState(false)

  const createProduct = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("keterrangan", keterrangan);
    formData.append("nik_alm", nik_alm);

    await axios
      .post(`https://subdomain.sudbalam.com/api/datatolak`, formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
          TOLAK PENGAJUAN SANTUNAN UANG DUKA DARI {nama_alm} DENGAN NIK {nik_alm} 
        </h5>
        <form className="form-pengajuan" onSubmit={createProduct}>
          <div className="form_pertama">
            <div className="form-group">
              <label htmlFor="nama">Penjelasan Penolakan</label>
              <textarea
                className="input"
                placeholder="Alasan penolakan pengajuan"
                type="text"
                value={keterrangan}
                onChange={(event) => {
                  setKeterrangan(event.target.value);
                }}
                required
              />
            </div>
          </div>
          <button className="button" type="submit" disabled={loading}>
            Tolak
          </button>
        </form>
      </main>

      <br />
      <br />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default UpdateDataTolak;
