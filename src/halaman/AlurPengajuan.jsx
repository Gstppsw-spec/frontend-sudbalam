import React from "react";
import ".././style/alur_pengajuan.css";
import ".././style/beranda.css";
import KontakInformasi from "./KontakInformasi";
import PengajuanComponent from "./PengajuanComponent";
import HeaderComponent from "./HeaderComponent";
import { usePersyaratanQuery } from "../api/persyaratan/usePersyartanQuery";

const AlurPengajuan = (props) => {
  const {data} = usePersyaratanQuery()

  console.log(data);
  return (
    <div className="app-container">
      <HeaderComponent />
      <main className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
          <div
            
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
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
