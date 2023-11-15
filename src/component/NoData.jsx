import React from "react";
import profile from ".././img/balam.png";
import ".././style/beranda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import KontakInformasi from "../halaman/KontakInformasi";
import HeaderComponent from "../halaman/HeaderComponent";

const ResultCard = (props) => {
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
    <div className="app-container">
      <HeaderComponent />

      <main className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
            <h5 className="judul-pembuka">
              Berikut adalah hasil perkembangan pencairan
            </h5>
            <span>Mohon maaf, data yang ada cari tidak ditemukkan</span>
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
          </div>
        </div>
      </main>
      <KontakInformasi />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default ResultCard;
