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
import Swal from "sweetalert2";

function DaftarPembayaran(props) {
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
      const options = {
      paginationSize: 3,
      pageStartIndex: 1,
      // showTotal: true,
      // paginationTotalRenderer: customTotal,
      // disablePageTitle: true,
      sizePerPageList : [
        { text: "10", value: 10, className: "my-custom-page-size" },
        { text: "25", value: 25, className: "my-custom-page-size" },
        { text: "50", value: 50, className: "my-custom-page-size" },
        { text: "100", value: 100, className: "my-custom-page-size" },
        // { text: "200", value: 200, className: "my-custom-page-size" },
      ]
    }

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
                pagination={paginationFactory(options)}
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