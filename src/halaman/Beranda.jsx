import React from "react";
import ".././style/beranda.css";
import KontakInformasi from "./KontakInformasi";
import PengajuanComponent from "./PengajuanComponent";
import HeaderComponent from "./HeaderComponent";

const Beranda = (props) => {
  return (
    <div className="app-container">
      <HeaderComponent/>

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

         
          <PengajuanComponent/>
        </div>
      </main>
      <KontakInformasi />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default Beranda;
