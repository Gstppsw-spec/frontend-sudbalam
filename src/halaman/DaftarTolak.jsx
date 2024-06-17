import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import FileSaver from "file-saver";
import { Row, Col} from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import XLSX from "xlsx/dist/xlsx.full.min";

const DaftarTolak = (props) => {
  const { SearchBar } = Search;
  const [items, setItems] = useState([]);

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
          console.log(result)
        },
        (error) => {
          console.log(error);
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
    },
  ];
  const options = {
    paginationSize: 3,
    pageStartIndex: 1,
    sizePerPageList : [
      { text: "10", value: 10, className: "my-custom-page-size" },
      { text: "25", value: 25, className: "my-custom-page-size" },
      { text: "50", value: 50, className: "my-custom-page-size" },
      { text: "100", value: 100, className: "my-custom-page-size" },
    ]
  }
  return (
    <main className="body">
      <div className="datatableTitle">
        Data Pengambilan Dana Santunan Kematian Ditolak
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
    </main>
  );
};

export default DaftarTolak;
