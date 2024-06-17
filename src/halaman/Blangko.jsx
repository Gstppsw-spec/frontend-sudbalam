import React from "react";
import ".././style/alur_pengajuan.css";
import ".././style/beranda.css";
import KontakInformasi from "./KontakInformasi";
import PengajuanComponent from "./PengajuanComponent";
import HeaderComponent from "./HeaderComponent";
import { useBlangkoQuery } from "../api/persyaratan/useBlangkoQuery";

const Blangko = (props) => {
  const { data } = useBlangkoQuery();

  const downloadFile = () => {
    const a = document.createElement("a");
    a.href = `${process.env.BASE_BLANGKO}/${data}`;
    console.log(`${process.env.BASE_BLANGKO}/${data}`);
    a.download = "blangko.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="app-container">
      <HeaderComponent />
      <main className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
            {data?.length > 1 ? (
              <>
                <div>
                  <span>File : {data}</span>
                </div>
                <button onClick={downloadFile}>Download Blangko</button>
              </>
            ) : (
              <>
              <span>Tidak ada data file blangko yang bisa diunduh</span>
              </>
            )}
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

export default Blangko;
