import React from "react";
import wa from "../img/wa.png";
import { useContactQuery, useKecamatanQuery } from "../api/persyaratan/useContactQuery";

function KontakInformasi() {
  const { data } = useContactQuery();
  const {data: dataKecamatan} = useKecamatanQuery()

  return (
    <div className="kotak-informasi">
      <h4>Contact Information</h4>
      <br />
      <hr />
      <div className="informasi-kontak">
        <div className="baris-kontak">
          {data?.map((contact, key) => (
            <div className="kolom-kontak">
              <label>
                {contact?.no_wa} ({contact?.nama})
              </label>
              <hr />
                {dataKecamatan
                  ?.filter((kecamatan) => Number(kecamatan.tim_id) === Number(contact.id))
                  .map((kecamatan, k) => (
                    <li key={k}>{kecamatan.nama}</li>
                  ))}
              <img
                alt="whatsapp"
                width="20"
                height="20"
                src={wa}
                onClick={() => {
                  window.location.href = `https://wa.me/${contact.no_wa.replace(/^0/, "+62")}?text=&`;
                }}
              ></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KontakInformasi;
