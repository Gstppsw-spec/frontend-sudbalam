// import React, { useEffect } from "react";
// import { useState } from "react";
// import "../style/listData.css";
// import FileSaver from "file-saver";
// import XLSX from "xlsx/dist/xlsx.full.min";
// import { useNavigate } from "react-router";

// function DaftarSelesai() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     if (!token && role !== 'admin') {
//       navigate('/login');
//       return;
//     }

//     setIsAuthenticated(true);
//   }, []);

//   //import data ke excel
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch("https://subdomain.sudbalam.com/api/dataterima",{
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((response) => response.json())
//       .then((json) => setData(json));
//   }, []);

//   const handleExport = () => {
//     const dataArray = data.map((d) => [d.no_bkp, d.nama_alm, d.nik_alm, d.no_akte, d.alamat_alm, d.kelurahan_alm, d.kecamatan_alm, d.tgl_alm, d.jam_alm, d.tlg_pembayaran,d.nama_waris,d.tlpn_waris, d.bantuan]);

//     const dataWithHeader = [['No Bkp','Nama Almarhum', 'NIK Almarhum', 'Nomor Akte Kematian', 'Alamat', 'Kelurahan', 'Kecamatan', 'Tanggal Kematian', 'Jam Kematian', 'Tanggal Pembayaran', 'Nama Penerima (ahli waris)', 'Nomor Telepon', 'Besar Bantuan']].concat(dataArray);
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet(dataWithHeader);
//     XLSX.utils.book_append_sheet(wb, ws, 'Data');

//     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//     FileSaver.saveAs(new Blob([wbout]), 'data.xlsx');

//   };

//   // //fetch data
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch("https://subdomain.sudbalam.com/api/dataterima",{
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
//     setFilteredData(
//       items.filter(
//         (item) =>
//           (item.kelurahan_alm.toLowerCase().includes(searchTerm.toLowerCase()) || item.kecamatan_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nama_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nik_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.alamat_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nama_waris.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nik_waris.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.no_bkp.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.no_akte.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       )
//     );
//   }, [items, searchTerm]);

//   let dataLimit = 100;
//   let pageLimit = 5;

//   const [pages, setPages] = useState(Math.ceil(filteredData.length / dataLimit));
//   const [currentPage, setCurrentPage] = useState(1);

//   function goToNextPage() {
//     if (currentPage < pages) {
//       setCurrentPage((page) => page + 1);
//     }
//   }

//   function goToPreviosPage() {
//     setCurrentPage((page) => page - 1);
//   }

//   function changePage(event) {
//     const pageNumber = Number(event.target.textContent);
//     setCurrentPage(pageNumber);
//   }

//   const getPaginatedData = () => {
//     const startIndex = currentPage * dataLimit - dataLimit;
//     const endIndex = startIndex + dataLimit;
//     return filteredData.slice(startIndex, endIndex);
//   };

//   const getPaginationGroup = () => {
//     if (pages > 0) {
//       let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
//       let end = Math.min(start + pageLimit, pages);
//       return new Array(end - start).fill().map((_, idx) => start + idx + 1);
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     setPages(Math.ceil(filteredData.length / dataLimit));
//   }, [filteredData, dataLimit]);

//   useEffect(() => {
//     window.scrollTo({ behavior: "smooth", top: "0px" });
//   }, [currentPage]);

//   if (error) {
//     return <div>ErrorL {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div className="loading"></div>;
//   } else {
//     return (
//       <main className="body">
//         <div className="datatableTitle">
//           Data Pengambilan Dana Santunan Kematian Selesai Diproses
//         </div>
//         <div className="cari" style={{ }}>
//           <input
//             type="search"
//             className="input"
//             name="search-form"
//             id="search-form"
//             placeholder="search"
//             value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="excel">
//           <button onClick={handleExport} className="export-excel">export to excel</button>
//         </div>

//         <div>
//           <div>
//             <div>
//               <table className="list-data">
//                 <thead>
//                   <tr className="hidden">
//                   <th className="listnih">No</th>
//                   <th className="listnih">No BKP</th>
//                     <th className="listnih">NIK Almarhum</th>
//                     <th className="listnih">Nama Almarhum</th>
//                     <th className="listnih">NIK Penerima (Ahli Waris)</th>
//                     <th className="listnih">Nama Penerima (Ahli Waris)</th>
//                     <th className="listnih">No Akte Kematian</th>
//                     <th className="listnih">Alamat</th>
//                     <th className="listnih">Kelurahan</th>
//                     <th className="listnih">Kecamatan</th>
//                     <th className="listnih">Hari/Tanggal Meninggal</th>
//                     <th className="listnih">Jam Meninggal</th>
//                     <th className="listnih">Nomor Telepon</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {filteredData.length > 0 &&
//                     getPaginatedData(filteredData).map((row, key) => (
//                       <tr key={key}>
//                         <td className="listnoh" data-label="NIK Almarhum">
//                           {key+1}
//                         </td>
//                         <td className="listnoh" data-label="NIK Almarhum">
//                           {row.no_bkp}
//                         </td>
//                         <td className="listnoh" data-label="NIK Almarhum">
//                           {row.nik_alm}
//                         </td>
//                         <td className="listnoh" data-label="Nama Almarhum">
//                           {row.nama_alm}
//                         </td>
//                         <td
//                           className="listnoh"
//                           data-label="NIK Penerima (Ahli Waris)"
//                         >
//                           {row.nik_waris}
//                         </td>
//                         <td
//                           className="listnoh"
//                           data-label="Nama Penerima (Ahli Waris)"
//                         >
//                           {row.nama_waris}
//                         </td>
//                         <td
//                           className="listnoh"
//                           data-label="Nomor Akte Kematian"
//                         >
//                           {row.no_akte}
//                         </td>
//                         <td className="listnoh" data-label="Alamat">
//                           {row.alamat_alm}
//                         </td>
//                         <td className="listnoh" data-label="Kelurahan">
//                           {row.kelurahan_alm}
//                         </td>

//                         <td className="listnoh" data-label="Kecamatan">
//                           {row.kecamatan_alm}
//                         </td>

//                         <td
//                           className="listnoh"
//                           data-label="Hari/Tanggal Meninggal"
//                         >
//                           {row.tgl_alm}
//                         </td>

//                         <td className="listnoh" data-label="Jam Meninggal">
//                           {row.jam_alm}
//                         </td>

//                         <td className="listnoh" data-label="Nomor Telepon">
//                           {row.tlpn_waris}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="pagi">
//             {currentPage > 1 && <a onClick={goToPreviosPage}>Prev</a>}
//               {getPaginationGroup().map((item, index) => (
//                 <a
//                   key={index}
//                   onClick={changePage}
//                   className={`paginationItem ${
//                     currentPage === item ? "active" : null
//                   }`}
//                 >
//                   <span>{item}</span>
//                 </a>
//               ))}
//               {currentPage < pages && <a onClick={goToNextPage}>Next</a>}
//             </div>
//           </div>
//           <br />
//         </div>
//       </main>
//     );
//   }
// }

// export default DaftarSelesai;

import FileSaver from "file-saver";
import { Link } from "react-router-dom";
import XLSX from "xlsx/dist/xlsx.full.min";
import { useNavigate } from "react-router";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import axios from "axios";

function DaftarSelesai() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [hapus, setHapus] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token && role !== "admin") {
      navigate("/login");
      return;
    }

    setIsAuthenticated(true);
  }, []);

  //import data ke excel
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://subdomain.sudbalam.com/api/dataterima", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleExport = () => {
    const dataArray = data.map((d) => [
      d.no_bkp,
      d.nama_alm,
      d.nik_alm,
      d.no_akte,
      d.alamat_alm,
      d.kelurahan_alm,
      d.kecamatan_alm,
      d.tgl_alm,
      d.jam_alm,
      d.tlg_pembayaran,
      d.nama_waris,
      d.tlpn_waris,
      d.bantuan,
    ]);

    const dataWithHeader = [
      [
        "No Bkp",
        "Nama Almarhum",
        "NIK Almarhum",
        "Nomor Akte Kematian",
        "Alamat",
        "Kelurahan",
        "Kecamatan",
        "Tanggal Kematian",
        "Jam Kematian",
        "Tanggal Pembayaran",
        "Nama Penerima (ahli waris)",
        "Nomor Telepon",
        "Besar Bantuan",
      ],
    ].concat(dataArray);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(dataWithHeader);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    FileSaver.saveAs(new Blob([wbout]), "data.xlsx");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://subdomain.sudbalam.com/api/dataterima", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

  const defaultSorted = [
    {
      dataField: "no_bkp",
      order: "asc",
    },
  ];

  const editData = async (id, nik_alm) => {
    const isConfirm = await Swal.fire({
      title: "Yakin untuk edit data?",
      text: "Data pengajuan akan diedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, alihkan ke form edit!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    navigate(`/dataselesai/dataselesai/editSelesai/${id}/${nik_alm}`);
  };

  const deleteData = async (nik_alm) => {
    const isConfirm = await Swal.fire({
      title: "Yakin untuk hapus data?",
      // text: "Data pengajuan akan diedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus data!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    const formData = new FormData();
    console.log(nik_alm);

    formData.append("nik_alm", nik_alm);

    const token = localStorage.getItem("token");
    await axios
      .post(`https://subdomain.sudbalam.com/api/hapusdata`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        // navigate("/dataselesai");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };
  const getNumber = (index) => {
    return index + 1;
  };

  const numberedData = items.map((item, index) => {
    return { ...item, no: getNumber(index) };
  });
  const columns = [
    {
      dataField: "no",
      text: "NO",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "2%",
      //     textAlign: "center",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     cursor: "pointer",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
        fontSize: "10px",
        fontWeight: "bold",
      },
    },
    {
      dataField: "no_bkp",
      text: "BKP",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === "asc") {
          return Number(a) - Number(b);
        }
        return Number(b) - Number(a);
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     textAlign: "center",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "nik_alm",
      text: "NIK Almarhum",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      headerAlign: "center",
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     textAlign: "center",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "nama_alm",
      text: "Nama Almarhum",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "nik_waris",
      text: "NIK Penerima (Ahli Waris)",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "nama_waris",
      text: "Nama Penerima (Ahli Waris)",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "no_akte",
      text: "No Akte Kematian",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "alamat_alm",
      text: "Alamat",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "kelurahan_alm",
      text: "Kelurahan",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "kecamatan_alm",
      text: "Kecamatan",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "tgl_alm",
      text: "Tanggal Meninggal",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "jam_alm",
      text: "Jam Meninggal",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },

    {
      dataField: "tlpn_waris",
      text: "Telepon",
      sort: true,
      style: {
        fontSize: "10px",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
    {
      dataField: "link",
      text: "Tindakan",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link onClick={() => editData(row.id, row.nik_alm)}>
              <button className="button">Edit</button>
            </Link>
            <button className="button" onClick={() => deleteData(row.nik_alm)}>
              Delete
            </button>
          </div>
        );
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "10px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   };
      // },
      // headerClasses: 'custom-header-style',
      headerStyle: {
        backgroundColor: "grey",
        color: "#000000",
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
      },
    },
  ];

  const sizePerPageList = [
    { text: "10", value: 10, className: "my-custom-page-size" },
    { text: "25", value: 25, className: "my-custom-page-size" },
    { text: "50", value: 50, className: "my-custom-page-size" },
    { text: "100", value: 100, className: "my-custom-page-size" },
    { text: "200", value: 200, className: "my-custom-page-size" },
  ];

  // const options = {
  //   paginationSize: 5,
  //   pageStartIndex: 1,
  //   sizePerPage: 10,
  //   hideSizePerPage: false,
  //   hidePageListOnlyOnePage: false,
  //   showTotal: true,
  //   // ...customStyles,
  // };

  if (error) {
    return <div>ErrorL {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <main className="body">
        <div className="datatableTitle">
          Data Pengambilan Dana Santunan Kematian Selesai Diproses
        </div>
        {/* <div className="excel">
          <button onClick={handleExport} className="export-excel">
            export to excel
          </button>
        </div> */}
        <ToolkitProvider
          keyField="no"
          data={numberedData}
          columns={columns}
          bootstrap4
          search
          defaultSorted={defaultSorted}
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <div className="float-right">
                    <SearchBar
                      {...props.searchProps}
                      placeholder="Search .."
                      searchPlaceholder=""
                    />
                  </div>
                </Col>
              </Row>

              {/* <ExportCSVButton {...props.csvProps}>
                Export CSV!!
              </ExportCSVButton> */}
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory({
                  sizePerPageList: sizePerPageList,
                  sizePerPage: 100,
                })}
                // pagination={paginationFactory(options)}
                wrapperClasses="table-responsive"
              />
            </div>
          )}
        </ToolkitProvider>
        <div className="excel">
          <button onClick={handleExport} className="export-excel">
            export to excel
          </button>
        </div>
      </main>
    );
  }
}

export default DaftarSelesai;
