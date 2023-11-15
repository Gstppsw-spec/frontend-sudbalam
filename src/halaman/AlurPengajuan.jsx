import React from "react";
import ".././style/alur_pengajuan.css";
import ".././style/beranda.css";
import KontakInformasi from "./KontakInformasi";
import PengajuanComponent from "./PengajuanComponent";
import HeaderComponent from "./HeaderComponent";

const AlurPengajuan = (props) => {
  return (
    <div className="app-container">
      <HeaderComponent />
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
              DISERAHKAN KE TIM DUKA PEMERINTAH KOTA BANDAR LAMPUNG
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
                4. WARGA BANDAR LAMPUNG YANG MENINGGAL DI LUAR BANDAR LAMPUNG
                DAN DIMAKAMKAN DILUAR BANDAR LAMPUNG TIDAK BERHAK MENERIMA
                BANTUAN
              </p>
              <p>
                5. BAYI YANG MENINGGAL DIDALAM KANDUNGAN TIDAK DAPAT MENERIMA
                BANTUAN
              </p>
            </span>
          </div>
          <br />
          <PengajuanComponent />
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
