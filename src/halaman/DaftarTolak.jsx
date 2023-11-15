import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import FileSaver from "file-saver";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import XLSX from "xlsx/dist/xlsx.full.min";
// const { SearchBar } = Search;

const DaftarTolak = (props) => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://subdomain.sudbalam.com/api/datatolak", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
          console.log(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleExport = () => {
    const dataArray = items.map((d) => [
      d.nama_alm,
      d.nik_alm,
      d.no_akte,
      d.alamat_alm,
      d.kelurahan_alm,
      d.kecamatan_alm,
      d.tgl_alm,
      d.jam_alm,
      d.nama_waris,
      d.nik_waris,
      d.tlpn_waris,
      d.keterrangan,
    ]);
    const dataWithHeader = [
      [
        "Nama Almarhum",
        "NIK Almarhum",
        "Nomor Akte Kematian",
        "Alamat",
        "Kelurahan",
        "Kecamatan",
        "Tanggal Kematian",
        "Jam Kematian",
        "Nama Penerima (ahli waris)",
        "NIK Penerima (ahli waris)",
        "Nomor Telepon",
        "Alasan Penolakan",
      ],
    ].concat(dataArray);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(dataWithHeader);
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    FileSaver.saveAs(new Blob([wbout]), "data.xlsx");
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "2%", textAlign: "center", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', };
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%", textAlign: "center" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "nik_waris",
      text: "NIK Penerima (Ahli Waris)",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "no_akte",
      text: "No Akte Kematian",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "alamat_alm",
      text: "Alamat",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "kelurahan_alm",
      text: "Kelurahan",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "kecamatan_alm",
      text: "Kecamatan",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "tgl_alm",
      text: "Tanggal Meninggal",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "jam_alm",
      text: "Jam Meninggal",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center',};
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "tlpn_waris",
      text: "Telepon",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', };
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
    },
    {
      dataField: "keterrangan",
      text: "Keterangan",
      sort: true,
      style: {
        fontSize: "10px",
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
      // headerStyle: () => {
      //   return { fontSize: "10px", width: "5%" , backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', };
      // },
      // headerAlign: 'center',
      // headerClasses: 'custom-header-style',
      // headerStyle: () => {
      //   return { width: "5%" };
      // },
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
  return (
    <main className="body">
      <div className="datatableTitle">
        Data Pengambilan Dana Santunan Kematian Ditolak
      </div>
      {/* <div className="container"> */}
      {/* <div className="table-responsive"> */}
        {/* <Container> */}
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
          <div className="excel">
          <button onClick={handleExport} className="export-excel">
            export to excel
          </button>
        </div>
        {/* </Container> */}
      {/* </div> */}
      {/* </div> */}
    </main>
  );
};

export default DaftarTolak;
