import React, { useEffect } from "react";
import ".././style/beranda.css";
import KontakInformasi from "./KontakInformasi";
import PengajuanComponent from "./PengajuanComponent";
import HeaderComponent from "./HeaderComponent";
import { usePengumumanQuery } from "../api/persyaratan/usePengumumanQuery";
import { useVideoQuery } from "../api/persyaratan/useVideoQuery";

const Beranda = (props) => {
  const { data } = usePengumumanQuery();
  const { data: dataVideo } = useVideoQuery();

  const getYouTubeId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  const videoId = getYouTubeId(dataVideo);

  console.log(videoId);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="app-container">
      <HeaderComponent />

      <main className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
            <h4 style={{ fontWeight: "bold" }}>
              Selamat Datang di SISTEM PENYALURAN SANTUNAN UANG DUKA
            </h4>
            <span>
              "Melalui sistem ini Anda dapat melihat status perkembangan
              pencairan santunan uang duka yang diberikan oleh Badan Pengelolaan
              Keuangan dan Aset Daerah Kota Bandar Lampung serta melakukan
              pendaftaran pengajuan pencairan dana santunan kematian."
            </span>
            <br />
            <span>
              Silahkan kunjungi halaman alur pengajuan untuk memahami alur
              pengajuan, syarat serta ketentuan apa saja yang dibutuhkan untuk
              bisa mendaftarkan pengajuan dana santunan kematian.
            </span>

            <div
              style={{ marginTop: 10 }}
              dangerouslySetInnerHTML={{ __html: data }}
            ></div>

            <br />
            <br />

            {!videoId ? (
              <></>
            ) : (
              <>
                <h5>Video Edukasi</h5>
                <iframe
                  width="560"
                  height="315"
                  src={embedUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded YouTube Video"
                ></iframe>
              </>
            )}
          </div>

          <br />

          <PengajuanComponent />
        </div>
      </main>
      <KontakInformasi />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};

export default Beranda;
