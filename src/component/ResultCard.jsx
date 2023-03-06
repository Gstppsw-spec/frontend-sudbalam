// import React, { useEffect } from "react";
// import profile from ".././img/balam.png";
// import ".././style/beranda.css";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import KontakInformasi from "../halaman/KontakInformasi";

// const ResultCard = (props) => {
//   const [keyword, setKeyWord] = useState("");
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [pencarian, setPencarian] = useState("");
//   const [items, setItems] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("ditolak");
//   const [pembayaran, setPembayaran] = useState([]);
//   const [filterPembayaran, setFilterPembayaran] = useState([]);
//   const [showImage, setShowImage] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch("https://subdomain.sudbalam.com/api/datatolak",{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setItems(result);
//           setIsLoaded(true);
//         },
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch("https://subdomain.sudbalam.com/api/dataterima",{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setPembayaran(result);
//       });
//   }, []);

//   const hasil_prop = props.nik;

//   useEffect(() => {
//     setFilteredData(items.filter((item) => item.nik_alm === hasil_prop));
//   }, [items, filterStatus]);

//   useEffect(() => {
//     setFilterPembayaran(
//       pembayaran.filter((item) => item.nik_alm === hasil_prop)
//     );
//   }, [pembayaran]);

//   const searchButtonHandler = (e) => {
//     e.preventDefault();
//     if (keyword.length === 16 && pencarian.length === 16) {
//       navigate(`/hasil/${keyword}`, {
//         state: { word: { keyword, pencarian } },
//       });
//     } else if (pencarian.length !== 16 || keyword.length !== 16) {
//       return (
//         <div>
//           {Swal.fire({
//             icon: "error",
//             text: "SILAHKAN CEK KEMBALI NIK ATAU NIK AHLI WARIS",
//           })}
//         </div>
//       );
//     }
//   };
//   return (
//     <div className="app-container">
//       <header className="header">
//         <div className="pertama container">
//           <table width="100%">
//             <tbody>
//               <tr>
//                 <td align="left">
//                   <div className="sistem">
//                   SISTEM PENYALURAN SANTUNAN UANG DUKA
//                   </div>
//                 </td>
//                 <td align="right">
//                   <img src={profile} style={{ height: "50px" }}></img>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </header>

//       <div className="navigasi_bar">
//         <nav>
//           <ul>
//             <li>
//               <Link to="/" className="linkkuh">
//                 BERANDA
//               </Link>
//             </li>
//             <li>
//               <Link to="/alur-pengajuan" className="linkkuh">
//                 ALUR PENGAJUAN
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="linkkuh">
//                 LOGIN
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className="body">
//         <div className="body-part-satu">
//           <div className="body-pembuka">
//             <h3 className="judul-pembuka">
//               Berikut adalah hasil perkembangan pencarian
//             </h3>
//             <br />
//             <div className="hasil-pencarian">
//               <div>
//                 <h3 className="head-hasil">
//                   <b>{props.nama.toUpperCase()} - </b>
//                   <small>{props.nik.toUpperCase()}</small>
//                 </h3>
//                 <br />
//                 <hr />
//                 <br />
//                 <div>
//                   <label className="label-hasil">Nama : {props.nama}</label>
//                 </div>
//                 <div>
//                   <label className="label-hasil">
//                     Nomor Induk Kependudukan : {props.nik}
//                   </label>
//                 </div>
//                 <div>
//                   <label className="label-hasil">
//                     Nama Penerima (ahli waris) : {props.namaWaris}
//                   </label>
//                 </div>

//                 <div>
//                   <label className="label-hasil">
//                     NIK Penerima (ahli waris) : {props.nikWaris}
//                   </label>
//                 </div>

//                 <div>
//                   <label className="label-hasil">
//                     Tanggal Kematian : {props.kematian}
//                   </label>
//                 </div>

//                 <br />

//                 <div className="perkembangan">
//                   <label className="label-hasil hasil-perkembangan">
//                     {props.stat.toUpperCase()}
//                   </label>
//                 </div>
//                 <br />

//                 <div>
//                   {filteredData.map((item) => (
//                     <label className="label-hasil">
//                       Alasan penolakan : {item.keterrangan}
//                     </label>
//                   ))}
//                 </div>

//                 <div>
//                   {filterPembayaran.map((item) => (
//                     <label className="label-hasil">
//                       Tanggal Pembayaran : {item.tlg_pembayaran}
//                     </label>
//                   ))}
//                 </div>

//                 <div className="gambar-bukti">
//                   {filterPembayaran.map((item) => (
//                     <div>
//                       <div className="perkembangann">
//                         <label className="label-hasil hasil-perkembangann">
//                           Bukti Pembayaran
//                         </label>
//                       </div>
//                       <img
//                         src={`https://subdomain.sudbalam.com/gambar/${item.gambar}`}
//                         alt="bukti pembayaran"
//                         onClick={() => {
//                           setShowImage(true);
//                         }}
//                         width="100px"
//                         style={{ cursor: "pointer" }}
//                       />
//                       {showImage && (
//                         <div
//                           style={{
//                             position: "fixed",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             backgroundColor: "rgba(0, 0, 0, 0.5)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                           onClick={() => setShowImage(false)}
//                         >
//                           <img
//                             src={`https://subdomain.sudbalam.com/gambar/${item.gambar}`}
//                             style={{ maxWidth: "90%", maxHeight: "90%" }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <br />

//           <div className="body-pencarian">
//             <div className="form">
//               <h5 style={{ color: "gray" }} className="pendaftaran-judul">
//                 CEK STATUS PENCAIRAN SANTUNAN UANG DUKA
//               </h5>
//               <hr />
//               <form id="perloginan">
//                 <label>NOMOR INDUK KEPENDUDUKAN ALMARHUM</label>
//                 <input
//                   className="input"
//                   placeholder="NOMOR INDUK KEPENDUDUKAN"
//                   type="text"
//                   value={keyword}
//                   id="PerkembanganPencairan_NIM"
//                   name="PerkembanganPencarian[NIM]"
//                   onChange={(event) => {
//                     setKeyWord(event.target.value);
//                   }}
//                   required
//                 />

//                 <br />

//                 <label>NOMOR INDUK KEPENDUDUKAN AHLI WARIS</label>

//                 <input
//                   className="input"
//                   placeholder="NOMOR INDUK KEPENDUDUKAN AHLI WARIS"
//                   type="text"
//                   value={pencarian}
//                   id="PerkembanganPencairan_NIM"
//                   name="PerkembanganPencarian[NIM]"
//                   onChange={(event) => {
//                     setPencarian(event.target.value);
//                   }}
//                   required
//                 />

//                 <br />

//                 <input
//                   onClick={searchButtonHandler}
//                   value="LIHAT PERKEMBANGAN PENCAIRAN"
//                   type="submit"
//                   className="button"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <KontakInformasi />

//       <footer className="footer">
//         Sistem Penyaluran Dana Santunan Kematian &copy; 2022
//       </footer>
//     </div>
//   );
// };

// export default ResultCard;


import React, { useEffect } from "react";
import profile from ".././img/balam.png";
import ".././style/beranda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import KontakInformasi from "../halaman/KontakInformasi";

const ResultCard = (props) => {
  const [keyword, setKeyWord] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pencarian, setPencarian] = useState("");
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ditolak");
  const [pembayaran, setPembayaran] = useState([]);
  const [filterPembayaran, setFilterPembayaran] = useState([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("https://subdomain.sudbalam.com/api/datatolakumum")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("https://subdomain.sudbalam.com/api/dataterimaumum")
      .then((res) => res.json())
      .then((result) => {
        setPembayaran(result);
      });
  }, []);

  const hasil_prop = props.nik;

  useEffect(() => {
    setFilteredData(items.filter((item) => item.nik_alm === hasil_prop));
  }, [items, filterStatus]);

  useEffect(() => {
    setFilterPembayaran(
      pembayaran.filter((item) => item.nik_alm === hasil_prop)
    );
  }, [pembayaran]);

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
                    SISTEM PENYALURAN DANA SANTUNAN KEMATIAN
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
              <Link to="/" className="linkkuh">
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

      <div className="body">
        <div className="body-part-satu">
          <div className="body-pembuka">
            <h3 className="judul-pembuka">
              Berikut adalah hasil perkembangan pencarian
            </h3>
            <br />
            <div className="hasil-pencarian">
              <div>
                <h3 className="head-hasil">
                  <b>{props.nama.toUpperCase()} - </b>
                  <small>{props.nik.toUpperCase()}</small>
                </h3>
                <br />
                <hr />
                <br />
                <div>
                  <label className="label-hasil">Nama : {props.nama}</label>
                </div>
                <div>
                  <label className="label-hasil">
                    Nomor Induk Kependudukan : {props.nik}
                  </label>
                </div>
                <div>
                  <label className="label-hasil">
                    Nama Penerima (ahli waris) : {props.namaWaris}
                  </label>
                </div>

                <div>
                  <label className="label-hasil">
                    NIK Penerima (ahli waris) : {props.nikWaris}
                  </label>
                </div>

                <div>
                  <label className="label-hasil">
                    Tanggal Kematian : {props.kematian}
                  </label>
                </div>

                <br />

                <div className="perkembangan">
                  <label className="label-hasil hasil-perkembangan">
                    {props.stat.toUpperCase()}
                  </label>
                </div>
                <br />

                <div>
                  {filteredData.map((item) => (
                    <label className="label-hasil">
                      Alasan penolakan : {item.keterrangan}
                    </label>
                  ))}
                </div>

                <div>
                  {filterPembayaran.map((item) => (
                    <label className="label-hasil">
                      Tanggal Pembayaran : {item.tlg_pembayaran}
                    </label>
                  ))}
                </div>

                <div className="gambar-bukti">
                  {filterPembayaran.map((item) => (
                    <div>
                      <div className="perkembangann">
                        <label className="label-hasil hasil-perkembangann">
                          Bukti Pembayaran
                        </label>
                      </div>
                      <img
                        src={`https://subdomain.sudbalam.com/gambar/${item.gambar}`}
                        alt="bukti pembayaran"
                        onClick={() => {
                          setShowImage(true);
                        }}
                        width="100%"
                        height="100%"
                        style={{ cursor: "pointer" }}
                      />
                      {showImage && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => setShowImage(false)}
                        >
                          <img
                            src={`https://subdomain.sudbalam.com/gambar/${item.gambar}`}
                            style={{ maxWidth: "90%", maxHeight: "90%" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="body-pencarian">
            <div className="form">
              <h5 style={{ color: "gray" }} className="pendaftaran-judul">
                CEK STATUS PENCAIRAN DANA SANTUNAN DUKA
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
      </div>

      <KontakInformasi />

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default ResultCard;
