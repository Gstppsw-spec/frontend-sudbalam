import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ".././style/alur_pengajuan.css";
import ".././style/beranda.css";

const PengajuanComponent = () => {
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
            text: "Silahkan cek kembali NIK atau NIK ahli waris",
          })}
        </div>
      );
    }
  };
  return (
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
  );
};

export default PengajuanComponent;
