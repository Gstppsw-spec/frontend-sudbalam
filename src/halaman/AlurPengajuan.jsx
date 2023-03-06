import profile from ".././img/balam.png";
import React, { useState } from "react";
import ".././style/alur_pengajuan.css";
import ".././style/beranda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import KontakInformasi from "./KontakInformasi";

const AlurPengajuan = (props) => {
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
              <Link className="linkkuh" to="/">
                BERANDA
              </Link>
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
            <h5>ALUR PENGAJUAN PENGAMBILAN DANA SANTUNAN KEMATIAN</h5>
            <span>1. MELAKUKAN PENDAFTARAN PENGAJUAN PADA FORM PENGAJUAN</span>
            <br></br>
            <br></br>
            <span>
              2. MENDATANGI RT UNTUK MENGISI SURAT PERMOHONAN BANTUAN UANG DUKA,
              SURAT KETERANGAN KEMATIAN DAN SURAT PERNYATAAN TANGGUNGJAWAB
              (FAKTA INTEGRITAS)
            </span>
            <br></br>
            <br></br>
            <span>
              3. MENYERAHKAN KEMBALI SURAT PERMOHONAN BANTUAN UANG DUKA, SURAT
              KETERANGAN KEMATIAN DAN FAKTA INTEGRITAS YANG SUDAH DI ISI DAN DI
              TANDA TANGANI KEPADA KETUA RT
            </span>
            <br></br>
            <br></br>
            <span>
              4. MENYERAHKAN SYARAT-SYARAT PERMOHONAN DANA SANTUNAN KEMATIAN
              KEPADA KETUA RT
            </span>
            <br></br>
            <br></br>
            <span>
              5. PERMOHONAN AKAN DISERAHKAN KE KELURAHAN DAN DARI KELURAHAN AKAN
              DISERAHKAN KE KANTOR BPKAD BAGIAN ANGGARAN UNTUK DIPROSES
            </span>
            <br></br>
            <br></br>
            <span>
              6. STATUS PENCAIRAN DANA PERMOHONAN DANA KEMATAIAN DAN DI CEK
              DENGAN MEMASUKKAN NIK PADA KOLOM PENCAIRAN
            </span>
            <br></br>
            <br></br>
            <h5>SYARAT PENGAJUAN PERMOHONAN DANA SANTUNAN KEMATIAN</h5>
            <span>
              1. PERMOHONAN TERTULIS DARI PENERIMA BANTUAN (ASLI) YANG DI
              KETAHUI OLEH PEJABAT YANG BERWENANG (LURAH/LK/RT)
            </span>
            <br></br>
            <span>2. FOTOCOPY KTP AHLI WARIS DAN YANG MENINGGAL DUNIA</span>
            <br></br>
            <span>
              3. FOTOCOPY KARTU KELUARGA (KK) AHLI WARIS DAN YANG MENINGGAL
              DUNIA
            </span>
            <br></br>
            <span>
              4. SURAT KETERANGAN KEMATIAN DARI LURAH/LK/RT/RUMAH SAKIT
            </span>
            <br></br>
            <span>5. AKTE KEMATIAN DARI DISDUK CAPIL KOTA BANDAR LAMPUNG</span>
            <br></br>
            <span>6. SURAT KETERANGAN DOMISILI AHLI WARIS</span>
            <br></br>
            <br></br>
            <h5>SYARAT TAMBAHAN PENGAJUAN BANTUAN UNTUK BAYI YANG MENINGGAL</h5>
            <span>1. FOTOCOPY KTP SUAMI ISTRI</span>
            <br></br>

            <span>2. FOTOCOPY BUKU NIKAH SUAMI ISTRI</span>
            <br></br>

            <span>
              3. FOTOCOPY SURAT KETERANGAN KELAHIRAN DARI BIDAN ATAU DOKTER
            </span>
            <br></br>

            <span>
              4. AKTE KEMATIAN LAHIR MATI DARI DISDUKKCAPIL KOTA BANDAR LAMPUNG
            </span>
            <br></br>
            <br></br>
            <span style={{ color: "red" }} className="catatan">
              NOTE :
              <p>
                1. PENGAJUAN PERMOHONAN DANA SANTUNAN KEMATIAN HANYA AKAN
                DITERIMA PALING LAMBAT 30 HARI SETELAH KEMATIAN
              </p>
              <p>
                2. HARAP SEGERA DATANGI KELURAHAN/RT TERKAIT UNTUK MENGONFIRMASI
                PENDAFTARAN PENGAJUAN SERTA MENGISI DAN MENGIRIM BERKAS SYARAT
                KE KELURAHAN
              </p>
              <p>
                3. WARGA YANG BERHAK MENERIMA BANTUAN ADALAH WARGA BANDAR
                LAMPUNG YANG DIMAKAMKAN DIBANDAR LAMPUNG ATAU MENINGGAL DI
                BANDAR LAMPUNG
              </p>
              <p>
                4. WARGA BANDAR LAMPUNG YANG MENINGGAL DI LUAR BANDAR LAMPUNG DAN DIMAKAMKAN DILUAR BANDAR LAMPUNG TIDAK BERHAK MENERIMA BANTUAN
              </p>
              <p>
                5. BAYI YANG MENINGGAL DIDALAM KANDUNGAN TIDAK DAPAT MENERIMA
                BANTUAN
              </p>
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
  );
};

export default AlurPengajuan;
