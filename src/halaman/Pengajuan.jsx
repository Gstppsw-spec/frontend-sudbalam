import React, { useEffect, useState } from "react";
import "../style/pengajuan.css";
import profile from ".././img/balam.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import ".././style/beranda.css";

const Pengajuan = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(false);

  const [nik_alm, setNik_Alm] = useState("");
  const [nama_alm, setNama_Alm] = useState("");
  const [nik_waris, setNik_Waris] = useState("");
  const [nama_waris, setNama_Waris] = useState("");
  const [no_akte, setNo_Akte] = useState("");
  const [alamat_alm, setAlamat_Alm] = useState("");
  const [kelurahan_alm, setKelurahan_Alm] = useState("");
  const [kecamatan_alm, setKecamatan_Alm] = useState("");
  const [tgl_alm, setTgl_Alm] = useState("");
  const [jam_alm, setJam_Alm] = useState("");
  const [tlpn_waris, setTlpn_Waris] = useState("");
  const [filterPengajuan, setFilterPengajuan] = useState([]);
  const [filterAkte, setFilterAkte] = useState([]);
  const [namaHari, setNamaHari] = useState("");

  function handleChange(e) {
    const date = new Date(e.target.value);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const namaHariBaru = new Intl.DateTimeFormat("id-ID", options).format(date);
    setTgl_Alm(e.target.value);
    setNamaHari(namaHariBaru);
  }

  const hasilNamaAlm = nama_waris
    .toLowerCase()
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  const hasilNamaWaris = nama_alm
    .toLowerCase()
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  const hasilAlamat = alamat_alm
    .toLowerCase()
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  const hasilKelurahan = kelurahan_alm
    .toLowerCase()
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  const hasilKecamatan = kecamatan_alm
    .toLowerCase()
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");

  const hasilAkte = no_akte.toUpperCase();
  // useEffect(() => {
  //   fetch("hhtp://apisudbalam.sudbalam.com/api/data")
  // })
  async function prepareFilterPengajuan(arrayToBeFilter, nik_alm_masukan) {
    const filtered = await arrayToBeFilter.filter((anObject) => {
      return (
        anObject.nik_alm.toLowerCase().indexOf(nik_alm_masukan.toLowerCase()) >
        -1
      );
    });
    return filtered;
  }

  async function prepareFilterPengajuanAkte(arrayToBeFilter, no_akte_masukan) {
    const filtered = await arrayToBeFilter.filter((anObject) => {
      return (
        anObject.no_akte.toLowerCase().indexOf(no_akte_masukan.toLowerCase()) >
        -1
      );
    });
    return filtered;
  }

  useEffect(() => {
    fetch("https://subdomain.sudbalam.com/api/dataumum")
      .then((res) => res.json())
      .then((result) => {
        prepareFilterPengajuan(result, nik_alm).then((trip) => {
          setFilterPengajuan(trip);
        });
        prepareFilterPengajuanAkte(result, no_akte).then((trip) => {
          setFilterAkte(trip);
        });
      });
  }, [nik_alm, no_akte]);

  const createProduct = async (e) => {
    e.preventDefault();

    const isConfirm = await Swal.fire({
      title: "Yakin data sudah benar?",
      text: "Data pengajuan akan dikirimkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, yakin!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (Array.isArray(filterPengajuan) && filterPengajuan.length) {
      setLoading(false);
      return (
        <div>
          {Swal.fire({
            icon: "error",
            text: "NIK SUDAH TERDAFTAR TIDAK DAPAT MENGAJUAKAN PENDAFTARAN",
          })}
        </div>
      );
    } else if (Array.isArray(filterAkte) && filterAkte.length) {
      setLoading(false);
      return (
        <div>
          {Swal.fire({
            icon: "error",
            text: "NOMOR AKTE KEMATIAN SUDAH TERDAFTAR TIDAK DAPAT MENGAJUAKAN PENDAFTARAN",
          })}
        </div>
      );
    } else if (nik_alm.length !== 16 || nik_waris.length !== 16) {
      setLoading(false);
      return (
        <div>
          {Swal.fire({
            icon: "error",
            text: "SILAHKAN CEK KEMBALI NIK ATAU NIK AHLI WARIS",
          })}
        </div>
      );
    } else {
      formData.append("nik_alm", nik_alm);
      formData.append("nama_alm", nama_alm);
      formData.append("nik_waris", nik_waris);
      formData.append("nama_waris", nama_waris);
      formData.append("no_akte", hasilAkte);
      formData.append("alamat_alm", alamat_alm);
      formData.append("kelurahan_alm", hasilKelurahan);
      formData.append("kecamatan_alm", hasilKecamatan);
      formData.append("tgl_alm", namaHari);
      formData.append("jam_alm", jam_alm);
      formData.append("tlpn_waris", tlpn_waris);
    }

    await axios
      .post(`https://subdomain.sudbalam.com/api/data`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        setLoading(false);

        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
          setLoading(true);
        } else {
          setLoading(true);
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
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

      <main className="body">
        <div className="judul-pengajuan">
          <h5>PENDAFTARAN PENGAJUAN PENCAIRAN SANTUNAN UANG DUKA</h5>
        </div>
        <form className="form-pengajuan" onSubmit={createProduct}>
          <div className="form-group">
            <label htmlFor="nama">Nama Almarhum</label>
            <input
              className="input"
              placeholder="Nama almarhum"
              type="text"
              value={nama_alm}
              onChange={(event) => {
                setNama_Alm(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nama">NIK Almarhum (Sesuai KTP)</label>
            <input
              className="input"
              placeholder="Nomor Induk Kependudukan Almarhum"
              type="text"
              value={nik_alm}
              onChange={(event) => {
                setNik_Alm(event.target.value);
              }}
              required
            />
            <p className="note">
              * untuk bayi yang meninggal dan belum memiliki NIK, masukkan NIK
              dari akte kematian dengan menghapus strip (-) dan huruf
            </p>
            <p className="note">
              * contoh : 0909-KMKLK-09876543-1234 = 0909098765431234
            </p>
            <p className="note one">
              * almarhum yang meninggal dibawah umur 17 Tahun dan belum memiliki
              KTP menggunakan nik sesuai KK
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="nama">Nomor Akte Kematian</label>
            <input
              className="input"
              placeholder="Nomor Akte Kematian"
              type="text"
              value={no_akte}
              onChange={(event) => {
                setNo_Akte(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nama">Nama Penerima (Ahli Waris)</label>
            <input
              className="input"
              placeholder="Nama penerima (ahli waris)"
              type="text"
              value={nama_waris}
              onChange={(event) => {
                setNama_Waris(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nama">NIK Penerima (Ahli Waris)</label>
            <input
              className="input"
              placeholder="Nomor Induk Kependudukan Penerima (ahli waris)"
              type="text"
              value={nik_waris}
              onChange={(event) => {
                setNik_Waris(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nama">Alamat Domisili</label>
            <input
              className="input"
              placeholder="Alamat Domisili"
              type="text"
              value={alamat_alm}
              onChange={(event) => {
                setAlamat_Alm(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nama">Kelurahan</label>
            <input
              className="input"
              placeholder="Kelurahan"
              type="text"
              value={kelurahan_alm}
              onChange={(event) => {
                setKelurahan_Alm(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nama">Kecamatan</label>
            <input
              className="input"
              placeholder="Kecamatan"
              type="text"
              value={kecamatan_alm}
              onChange={(event) => {
                setKecamatan_Alm(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Hari/Tanggal Meninggal</label>
            <input
              className="input"
              type="date"
              data-date-format="DD MMMM YYYY"
              value={tgl_alm}
              onChange={handleChange}
              required
              lang="id"
            />
            <p>Hari : {namaHari}</p>
            {/* <DatePicker
              id="tanggal"
              selected={tgl_alm}
              // onChange={(tgl_alm) = setTgl_Alm(tgl_alm) }
              dateFormat="EEEE, dd MMMM yyyy"
              locale="id"
              placeholderText="Tanggal kematian"
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="email">Jam Meninggal</label>
            <input
              className="input"
              type="time"
              // step="1"
              value={jam_alm}
              onChange={(event) => {
                setJam_Alm(event.target.value);
              }}
              required
            />
            <p>Jam : {jam_alm} WIB</p>
          </div>

          <div className="form-group">
            <label htmlFor="email">Nomor Telepon</label>
            <input
              className="input"
              placeholder="Nomor Telepon"
              type="text"
              value={tlpn_waris}
              onChange={(event) => {
                setTlpn_Waris(event.target.value);
              }}
              required
            />
          </div>

          <button className="button" disabled={loading} type="submit">
            KIRIM
          </button>
        </form>
      </main>

      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2022
      </footer>
    </div>
  );
};

export default Pengajuan;

// import React, { useEffect, useState } from "react";
// import "../style/pengajuan.css";
// import profile from ".././img/balam.png";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import axios from "axios";
// import ".././style/beranda.css";

// const Pengajuan = () => {
//   const navigate = useNavigate();
//   const [validationError, setValidationError] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [nik_alm, setNik_Alm] = useState("");
//   const [nama_alm, setNama_Alm] = useState("");
//   const [nik_waris, setNik_Waris] = useState("");
//   const [nama_waris, setNama_Waris] = useState("");
//   const [no_akte, setNo_Akte] = useState("");
//   const [alamat_alm, setAlamat_Alm] = useState("");
//   const [kelurahan_alm, setKelurahan_Alm] = useState("");
//   const [kecamatan_alm, setKecamatan_Alm] = useState("");
//   const [tgl_alm, setTgl_Alm] = useState("");
//   const [jam_alm, setJam_Alm] = useState("");
//   const [tlpn_waris, setTlpn_Waris] = useState("");
//   const [filterPengajuan, setFilterPengajuan] = useState([]);
//   const [filterAkte, setFilterAkte] = useState([]);

//   // useEffect(() => {
//   //   fetch("hhtp://apisudbalam.sudbalam.com/api/data")
//   // })
//   async function prepareFilterPengajuan(arrayToBeFilter, nik_alm_masukan) {
//     const filtered = await arrayToBeFilter.filter((anObject) => {
//       return (
//         anObject.nik_alm.toLowerCase().indexOf(nik_alm_masukan.toLowerCase()) >
//         -1
//       );
//     });
//     return filtered;
//   }

//   async function prepareFilterPengajuanAkte(arrayToBeFilter, no_akte_masukan) {
//     const filtered = await arrayToBeFilter.filter((anObject) => {
//       return (
//         anObject.no_akte.toLowerCase().indexOf(no_akte_masukan.toLowerCase()) >
//         -1
//       );
//     });
//     return filtered;
//   }

//   useEffect(() => {
//     fetch("https://subdomain.sudbalam.com/api/data")
//       .then((res) => res.json())
//       .then((result) => {
//         prepareFilterPengajuan(result, nik_alm).then((trip) => {
//           setFilterPengajuan(trip);
//         });
//         prepareFilterPengajuanAkte(result, no_akte).then((trip) => {
//           setFilterAkte(trip);
//         });
//       });
//   }, [nik_alm, no_akte]);

//   const createProduct = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     const formData = new FormData();
//     if (Array.isArray(filterPengajuan) && filterPengajuan.length) {
//       setLoading(false);
//       return (
//         <div>
//           {Swal.fire({
//             icon: "error",
//             text: "NIK SUDAH TERDAFTAR TIDAK DAPAT MENGAJUAKAN PENDAFTARAN",
//           })}
//         </div>
//       );

//     } else if (Array.isArray(filterAkte) && filterAkte.length) {
//       setLoading(false);
//       return (
//         <div>
//           {Swal.fire({
//             icon: "error",
//             text: "NOMOR AKTE KEMATIAN SUDAH TERDAFTAR TIDAK DAPAT MENGAJUAKAN PENDAFTARAN",
//           })}
//         </div>
//       );
//     } else if (nik_alm.length !== 16 || nik_waris.length !== 16) {
//       setLoading(false);
//       return (
//         <div>
//           {Swal.fire({
//             icon: "error",
//             text: "SILAHKAN CEK KEMBALI NIK ATAU NIK AHLI WARIS",
//           })}
//         </div>
//       );
//     } else {
//       formData.append("nik_alm", nik_alm);
//       formData.append("nama_alm", nama_alm);
//       formData.append("nik_waris", nik_waris);
//       formData.append("nama_waris", nama_waris);
//       formData.append("no_akte", no_akte);
//       formData.append("alamat_alm", alamat_alm);
//       formData.append("kelurahan_alm", kelurahan_alm);
//       formData.append("kecamatan_alm", kecamatan_alm);
//       formData.append("tgl_alm", tgl_alm);
//       formData.append("jam_alm", jam_alm);
//       formData.append("tlpn_waris", tlpn_waris);
//     }

//     await axios
//       .post(`https://subdomain.sudbalam.com/api/data`, formData)
//       .then(({ data }) => {
//         Swal.fire({
//           icon: "success",
//           text: data.message,
//         });
//         setLoading(false);
//         navigate("/");
//       })
//       .catch(({ response }) => {
//         if (response.status === 422) {
//           setValidationError(response.data.errors);
//         } else {
//           Swal.fire({
//             text: response.data.message,
//             icon: "error",
//           });
//         }
//       });
//   };

//   function handlePrint(){
//     window.print();
//   }

//   return (
//     <div className="app-container">
//       <header className="header">
//         <div className="pertama container">
//           <table width="100%">
//             <tbody>
//               <tr>
//                 <td align="left">
//                   <div className="sistem">
//                     SISTEM PENYALURAN SANTUNAN UANG DUKA
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
//       <button onClick={handlePrint}>Print</button>

//       <main className="body" id="my-form">
//         <div className="judul-pengajuan">
//           <h5>PENDAFTARAN PENGAJUAN PENCAIRAN SANTUNAN UANG DUKA</h5>

//         </div>

//         <form className="form-pengajuan" onSubmit={createProduct}>
//           <div className="form-group">
//             <label htmlFor="nama">Nama Almarhum</label>
//             <input
//               className="input"
//               placeholder="Nama almarhum"
//               type="text"
//               value={nama_alm}
//               onChange={(event) => {
//                 setNama_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="nama">NIK Almarhum (Sesuai KTP)</label>
//             <input
//               className="input"
//               placeholder="Nomor Induk Kependudukan Almarhum"
//               type="text"
//               value={nik_alm}
//               onChange={(event) => {
//                 setNik_Alm(event.target.value);
//               }}
//               required
//             />
//             <p className="note">
//               * untuk bayi yang meninggal dan belum memiliki NIK, masukkan NIK
//               dari akte kematian dengan menghapus strip (-) dan huruf
//             </p>
//             <p className="note">
//               * contoh : 0909-KMKLK-09876543-1234 = 0909098765431234
//             </p>
//             <p className="note one">
//               * almarhum yang meninggal dibawah umur 17 Tahun dan belum memiliki KTP menggunakan nik sesuai KK
//             </p>
//           </div>

//           <div className="form-group">
//             <label htmlFor="nama">Nama Penerima (Ahli Waris)</label>
//             <input
//               className="input"
//               placeholder="Nama penerima (ahli waris)"
//               type="text"
//               value={nama_waris}
//               onChange={(event) => {
//                 setNama_Waris(event.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="nama">NIK Penerima (Ahli Waris)</label>
//             <input
//               className="input"
//               placeholder="Nomor Induk Kependudukan Penerima (ahli waris)"
//               type="text"
//               value={nik_waris}
//               onChange={(event) => {
//                 setNik_Waris(event.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="nama">Nomor Akte Kematian</label>
//             <input
//               className="input"
//               placeholder="Nomor Akte Kematian"
//               type="text"
//               value={no_akte}
//               onChange={(event) => {
//                 setNo_Akte(event.target.value);
//               }}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="nama">Alamat Domisili</label>
//             <input
//               className="input"
//               placeholder="Alamat Domisili"
//               type="text"
//               value={alamat_alm}
//               onChange={(event) => {
//                 setAlamat_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="nama">Kelurahan</label>
//             <input
//               className="input"
//               placeholder="Kelurahan"
//               type="text"
//               value={kelurahan_alm}
//               onChange={(event) => {
//                 setKelurahan_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="nama">Kecamatan</label>
//             <input
//               className="input"
//               placeholder="Kecamatan"
//               type="text"
//               value={kecamatan_alm}
//               onChange={(event) => {
//                 setKecamatan_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Hari/Tanggal Meninggal</label>
//             <input
//               className="input"
//               type="date"
//               value={tgl_alm}
//               onChange={(event) => {
//                 setTgl_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Jam Meninggal</label>
//             <input
//               className="input"
//               type="time"
//               value={jam_alm}
//               onChange={(event) => {
//                 setJam_Alm(event.target.value);
//               }}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Nomor Telepon</label>
//             <input
//               className="input"
//               placeholder="Nomor Telepon"
//               type="text"
//               value={tlpn_waris}
//               onChange={(event) => {
//                 setTlpn_Waris(event.target.value);
//               }}
//               required
//             />
//           </div>

//           <button className="button" disabled={loading} type="submit">
//             KIRIM
//           </button>
//         </form>
//         <style>
//         {`
//           @media print {
//             body * {
//               visibility: hidden;
//             }
//             #my-form, #my-form * {
//               visibility: visible;
//             }
//             #my-form {
//               position: absolute;
//               left: 0;
//               top: 0;
//             }
//             ::placeholder {
//               color: 'white';
//               visibility: hidden;
//             }

//             ::-webkit-input-placeholder {
//               color: 'white';
//               visibility: hidden;
//             }

//             :-moz-placeholder {
//               color: 'white';
//               opacity: 0;
//               visibility: hidden;
//             }

//             :-ms-input-placeholder {
//               color: 'white';
//               visibility: hidden;
//             }

//             button[type="submit"]{
//               display: none;
//             }
//             .form-group {
//               flex: 1 1 100%;
//               margin-bottom: 0px;
//             }
//             .judul-pengajuan>h5{
//               text-align: center;
//               color: "blue";
//             }
//           }
//         `}
//       </style>
//       </main>

//       <footer className="footer">
//         Sistem Penyaluran Dana Santunan Kematian &copy; 2022
//       </footer>
//     </div>
//   );
// };

// export default Pengajuan;
