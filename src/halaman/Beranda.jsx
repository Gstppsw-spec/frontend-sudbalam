import profile from ".././img/balam.png";
import React, { useState } from "react";
import ".././style/beranda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import KontakInformasi from "./KontakInformasi";

const Beranda = (props) => {
  const [keyword, setKeyWord] = useState("");
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (keyword.length === 16 && pencarian.length === 16) {
      navigate(`/hasil/${keyword}`, {
        state: { word: { keyword, pencarian } },
      });
    } else if (pencarian.length !== 16 || keyword.length !== 16) {
      return (
        <div>
          {Swal.fire({
            icon: "error",
            text: "SILAHKAN CEK KEMBALI NIK ATAU NIK AHLI WARIS",
          })}
        </div>
      );
    }
  };

  return (
    // <div className="con">
    <div className="app-container">
      <header className="header">
        <div className="pertama container">
          <table width="100%">
            <tbody>
              <tr>
                <td align="left">
                  <div className="sistem">
                  SISTEM PENYALURAN SANTUNAN UANG DUKA
                  </div>
                </td>
                <td align="right">
                  <img src={profile} style={{ height: "50px" }}></img>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      <div className="navigasi_bar">
        <nav>
          <ul>
            <li>
              <Link className="linkkuh">BERANDA</Link>
            </li>
            <li>
              <Link to="/alur-pengajuan" className="linkkuh">
                ALUR PENGAJUAN
              </Link>
            </li>
            <li>
              <Link to="/login" className="linkkuh">
                LOGIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
            <h3 className="judul-pembuka">
              Selamat Datang di SISTEM PENYALURAN SANTUNAN UANG DUKA
            </h3>
            <span>
              "Melalui sistem ini Anda dapat melihat status perkembangan
              pencairan santunan uang duka yang diberikan oleh Badan
              Pengelolaan Keuangan dan Aset Daerah Kota Bandar Lampung serta
              melakukan pendaftaran pengajuan pencairan dana santunan kematian."
            </span>
            <br />
            <span>
              Silahkan kunjungi halaman alur pengajuan untuk memahami alur
              pengajuan, syarat serta ketentuan apa saja yang dibutuhkan untuk
              bisa mendaftarkan pengajuan dana santunan kematian.
            </span>
          </div>
          <br />

          <div className="body-pencarian">
            <div className="form">
              <h5 style={{ color: "gray" }} className="pendaftaran-judul">
                CEK STATUS PENCAIRAN SANTUNAN UANG DUKA
              </h5>
              <hr />
              <form id="perloginan">
                <label>NOMOR INDUK KEPENDUDUKAN ALMARHUM</label>
                <input
                  className="input"
                  placeholder="NOMOR INDUK KEPENDUDUKAN"
                  type="text"
                  value={keyword}
                  id="PerkembanganPencairan_NIM"
                  name="PerkembanganPencarian[NIM]"
                  onChange={(event) => {
                    setKeyWord(event.target.value);
                  }}
                  required
                />

                <br />

                <label>NOMOR INDUK KEPENDUDUKAN AHLI WARIS</label>

                <input
                  className="input"
                  placeholder="NOMOR INDUK KEPENDUDUKAN AHLI WARIS"
                  type="text"
                  value={pencarian}
                  id="PerkembanganPencairan_NIM"
                  name="PerkembanganPencarian[NIM]"
                  onChange={(event) => {
                    setPencarian(event.target.value);
                  }}
                  required
                />

                <br />

                <input
                  onClick={searchButtonHandler}
                  value="LIHAT PERKEMBANGAN PENCAIRAN"
                  type="submit"
                  className="button"
                />
              </form>
            </div>
            <div className="pendaftaran-pengajuan">
              <div className="keterangan-pengajuan">
                <h5 style={{ color: "gray" }} className="pendaftaran-judul">
                  PENDAFTARAN PENGAJUAN PENCARIAN SANTUNAN UANG DUKA
                </h5>
                <hr />
                <span>
                  Jika sudah memahami alur pengajuan permohonan pencarian dana
                  santunan duka kematian, silahkan klik tombol dibawah ini untuk
                  melakukan pendaftaran pengajuan pencairan dana santunan duka
                </span>
              </div>

              <div className="button-pengajuan">
                <Link to="/pengajuan" className="link-pengajuan">
                  <button className="button">PENGAJUAN</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <KontakInformasi />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
    // </div>
  );
};

export default Beranda;
