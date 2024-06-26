import React, { useEffect, useState } from "react";
import "../style/pengajuan.css";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import Topbar from "../component/Topbar";
import NavbarTeam from "../component/NavbarTeam";

const EditPengajuan = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [nik_alm, setNik_Alm] = useState("");
  const [nama_alm, setNama_Alm] = useState("");
  const [nik_waris, setNik_Waris] = useState("");
  const [nama_waris, setNama_Waris] = useState("");
  const [no_akte, setNo_Akte] = useState("");
  const [alamat_alm, setAlamat_Alm] = useState("");
  const [kelurahan_alm, setKelurahan_Alm] = useState("");
  const [kecamatan_alm, setKecamatan_Alm] = useState("");
  const [tgl_alm, setTgl_Alm] = useState("");
  const [jam_alm, setJam_Alm] = useState("");
  const [tlpn_waris, setTlpn_Waris] = useState("");
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
    setTgl_Alm(e.target.value);
    setNamaHari(namaHariBaru);
  }

  const fetchProducts = async () => {
    await axios.get(`https://subdomain.sudbalam.com/api/data/${id}`).then(({ data }) => {
      setNik_Alm(data.nik_alm);
      setNama_Alm(data.nama_alm);
      setNik_Waris(data.nik_waris);
      setNama_Waris(data.nama_waris);
      setNo_Akte(data.no_akte);
      setAlamat_Alm(data.alamat_alm);
      setKelurahan_Alm(data.kelurahan_alm);
      setKecamatan_Alm(data.kecamatan_alm);
      setNamaHari(data.tgl_alm);
      setJam_Alm(data.jam_alm);
      setTlpn_Waris(data.tlpn_waris);
    });
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

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
      formData.append("nik_alm", nik_alm);
      formData.append("nama_alm", nama_alm);
      formData.append("nik_waris", nik_waris);
      formData.append("nama_waris", nama_waris);
      formData.append("no_akte", no_akte);
      formData.append("alamat_alm", alamat_alm);
      formData.append("kelurahan_alm", kelurahan_alm);
      formData.append("kecamatan_alm", kecamatan_alm);
      formData.append("tgl_alm", namaHari);
      formData.append("jam_alm", jam_alm);
      formData.append("tlpn_waris", tlpn_waris);
      formData.append("id", id);
    }
    const token = localStorage.getItem('token');
    await axios
      .post(`https://subdomain.sudbalam.com/api/editdata`, formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/dataproses");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response);
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
          EDIT DATA PENGAJUAN PENCAIRAN DANA SANTUNAN DUKA
        </h5>
        <form className="form-pengajuan" onSubmit={createProduct}>
          <div className="form_pertama">
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
              <label htmlFor="nama">Nama Penerima (Ahli Waris)</label>
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
              <label htmlFor="nama">NIK Penerima (Ahli Waris)</label>
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
              <label htmlFor="nama">Nomor Akte Kematian</label>
              <input
              className="input"
                type="text"
                value={no_akte}
                onChange={(event) => {
                  setNo_Akte(event.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="form_kedua">
            <div className="form-group">
              <label htmlFor="nama">Alamat</label>
              <input
              className="input"
                type="text"
                value={alamat_alm}
                onChange={(event) => {
                  setAlamat_Alm(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nama">Kelurahan</label>
              <input
              className="input"
                type="text"
                value={kelurahan_alm}
                onChange={(event) => {
                  setKelurahan_Alm(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nama">Kecamatan</label>
              <input
              className="input"
                type="text"
                value={kecamatan_alm}
                onChange={(event) => {
                  setKecamatan_Alm(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Hari/Tanggal Meninggal</label>
              <input
              className="input"
                type="date"
                value={tgl_alm}
                onChange={handleChange}
                // required
              />
              <p>Hari : {namaHari}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Jam Meninggal</label>
              <input
              className="input"
                type="time"
                value={jam_alm}
                onChange={(event) => {
                  setJam_Alm(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Nomor Telepon</label>
              <input
              className="input"
                type="text"
                value={tlpn_waris}
                onChange={(event) => {
                  setTlpn_Waris(event.target.value);
                }}
                required
              />
            </div>
          </div>
          <button className="button" type="submit">Edit</button>
        </form>
      </main>

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default EditPengajuan;
