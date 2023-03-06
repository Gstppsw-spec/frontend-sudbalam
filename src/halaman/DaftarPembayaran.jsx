// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import "../style/listData.css";

// function DaftarPembayaran() {
// const [showImage, setShowImage] = useState(false);
// const [currentImage, setCurrentImage] = useState(null);

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

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
//           (item.nama_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nik_alm.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nama_waris.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.nik_waris.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.no_bkp.toLowerCase().includes(searchTerm.toLowerCase())
//           || item.tlg_pembayaran.toLowerCase().includes(searchTerm.toLowerCase())
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
//       <div className="body">
//         <div className="datatableTitle">
//           Bukti Pembayaran Pengajuan Dana Santunan Kematian
//         </div>
//         <div className="cari">
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

//         <div>
//           <div>
//             <div>
//               <table className="list-data">
//                 <thead>
//                   <tr className="hidden">
//                   <th className="listnih">No</th>
//                     <th className="listnih">Nomor BKP</th>
//                     <th className="listnih">NIK Almarhum</th>
//                     <th className="listnih">Nama Almarhum</th>
//                     <th className="listnih">Nama Penerima (Ahli Waris)</th>
//                     <th className="listnih">Besar Bantuan</th>
//                     <th className="listnih">Tanggal Pembayaran</th>
//                     <th className="listnih">Bukti Pembayaran</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {filteredData.length > 0 &&
//                     getPaginatedData(filteredData).map((row, key) => (
//                       <tr key={key}>
//                         <td className="listnoh" data-label="Nomor BKP">
//                           {key+1}
//                         </td>
//                         <td className="listnoh" data-label="Nomor BKP">
//                           {row.no_bkp}
//                         </td>
//                         <td className="listnoh" data-label="NIK Almarhum">
//                           {row.nik_alm}
//                         </td>
//                         <td className="listnoh" data-label="NIK Almarhum">
//                           {row.nama_alm}
//                         </td>
//                         <td className="listnoh" data-label="Nama Penerima">
//                           {row.nama_waris}
//                         </td>
//                         <td className="listnoh" data-label="Besar Bantuan">
//                           {row.bantuan}
//                         </td>
//                         <td className="listnoh" data-label="Tanggal Pembayaran">
//                           {row.tlg_pembayaran}
//                         </td>
//                         <td className="listnoh" data-label="Bukti Pembayaran">

// <img
//   className="gambarPembayaran"
//   key={key}
//   src={`https://subdomain.sudbalam.com/gambar/${row.gambar}`}
//   alt="bukti pembayaran"
//   onClick={() => {
//     setCurrentImage(`https://subdomain.sudbalam.com/gambar/${row.gambar}`);
//     setShowImage(true);
//   }}
//   width="50px"
// />
// {showImage && (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//     onClick={() => setShowImage(false)}
//   >
//     <img
//       src={currentImage}
//       style={{ maxWidth: "90%", maxHeight: "90%" }}
//     />
//   </div>
// )}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="pagi">
//               {currentPage > 1 && <a onClick={goToPreviosPage}>Prev</a>}
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
//       </div>
//     );
//   }
// }

// export default DaftarPembayaran;

import { useNavigate } from "react-router";
import "../style/listData.css";
import { Link } from "react-router-dom";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

function DaftarPembayaran() {
  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { SearchBar } = Search;
  const navigate = useNavigate();

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
    navigate(`/datapembayaran/datapembayaran/editPembayaran/${id}/${nik_alm}`);
    console.log(nik_alm);
    console.log(id);
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
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
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
      //     fontSize: "12px",
      //     width: "5%",
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
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
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
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "5%",
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
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
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
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     cursor: "pointer",
      //     textAlign: "center",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
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
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     cursor: "pointer",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
    },
    },
    {
      dataField: "bantuan",
      text: "Besar Bantuan",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     cursor: "pointer",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
    },
    },

    {
      dataField: "tlg_pembayaran",
      text: "Tanggal Pembayaran",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     cursor: "pointer",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
    },
    },
    {
      dataField: "gambar",
      text: "Bukti Pembayaran",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
    },
      formatter: (row, no) => {
        return (
          <div>
            <img
              className="gambarPembayaran"
              key={no}
              src={`https://subdomain.sudbalam.com/gambar/${row}`}
              alt="bukti pembayaran"
              
              width="60px"
            />
          </div>
        );
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
          </div>
        );
      },
      // headerStyle: () => {
      //   return {
      //     fontSize: "12px",
      //     width: "5%",
      //     backgroundColor: "grey",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     textAlign: "center",
      //   };
      // },
      // headerAlign: "center",
      // headerClasses: "custom-header-style",
      headerStyle: {
      backgroundColor: 'grey',
      color: '#000000',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '10px',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      cursor: 'pointer'
    },
    },
  ];
  const sizePerPageList = [
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "50", value: 50 },
    { text: "100", value: 100 },
    { text: "200", value: 200 },
  ];

  if (error) {
    return <div>ErrorL {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <main className="body">
        <div className="datatableTitle">
          Bukti Pembayaran Pengajuan Dana Santunan Kematian
        </div>
        <ToolkitProvider
          keyField="id"
          data={numberedData}
          columns={columns}
          bootstrap4
          search
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
                wrapperClasses="table-responsive"
              />
            </div>
          )}
        </ToolkitProvider>
      </main>
    );
  }
}

export default DaftarPembayaran;
