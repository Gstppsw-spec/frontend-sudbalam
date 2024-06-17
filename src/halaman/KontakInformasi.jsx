import React from "react";
import wa from "../img/wa.png";

function KontakInformasi() {
  return (
    <div className="kotak-informasi">
      <h4>Contact Information</h4>
      <br />
      <hr />
      <div className="informasi-kontak">
        <div className="baris-kontak">
          {/* <div className="kolom-kontak">
            <label>081279021312 (WIKO SAPUTRA, SE)</label>
            <hr />

            <li>Kec. Sukabumi</li>
            <li>Kec. Panjang</li>
            <li>Kec. Labuan Ratu</li>
            <li>Kec. Tanjung Seneng</li>
            <img
              alt="whatsapp"
              width="20"
              height="20"
              src={wa}
              onClick={() => {
                window.location.href = `https://wa.me/+6281279021312?text=&`;
              }}
            ></img>
          </div> */}

          <div className="kolom-kontak">
            <label>082282250886 (TOMMY PRATAMA)</label>
            <hr />
            <li>Kec. Telukbetung Selatan</li>
            <li>Kec. Telukbetung Timur</li>
            <li>Kec. Telukbetung Barat</li>
            <li>Kec. Telukbetung Utara</li>
            <img
              alt="whatsapp"
              width="20"
              height="20"
              src={wa}
              onClick={() => {
                window.location.href = `https://wa.me/+6282282250886?text=&`;
              }}
            ></img>
          </div>
          <div className="kolom-kontak">
            <label>082278829255 (WANDI DARMAWAN)</label>
            <hr />
            <li>Kec. Enggal</li>
            <li>Kec. T. Karang Pusat</li>
            <li>Kec. T. Karang Timur</li>
            <li>Kec. Bumi Waras</li>
            <img
              className="whatsapp"
              alt="whatsapp"
              width="20"
              height="20"
              src={wa}
              onClick={() => {
                window.location.href = `https://wa.me/+6282278829255?text=&`;
              }}
            ></img>
          </div>
          <div className="kolom-kontak">
            <label>081278223337 (YANTO HARIYANTO)</label>
            <hr />
            <li>Kec. T. Karang Barat</li>
            <li>Kec. Langkapura</li>
            <li>Kec. Kemiling</li>
            <li>Kec. Rajabasa</li>
            <img
              width="20"
              height="20"
              alt="whatsapp"
              src={wa}
              onClick={() => {
                window.location.href = `https://wa.me/+6281278223337?text=&`;
              }}
            ></img>
          </div>

          <div className="kolom-kontak">
            <label>085788802627 (JUNAIDI)</label>
            <label style={{visibility:'hidden'}}></label>
            <hr />
            <li>Kec. Kedaton</li>
            <li>Kec. Kedamaian</li>
            <li>Kec. Way Halim</li>
            <li>Kec. Sukarame</li>
           
            <img
              alt="whatsapp"
              width="20"
              height="20"
              src={wa}
              onClick={() => {
                window.location.href = `https://wa.me/+6285788802627?text=&`;
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KontakInformasi;
