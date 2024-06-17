import FileSaver from "file-saver";
import XLSX from "xlsx/dist/xlsx.full.min";
import { useNavigate } from "react-router";
import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import {Row, Col } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import axios from "axios";
import filterFactory from "react-bootstrap-table2-filter";
import {
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { useDoneQuery } from "../api/data-selesai/useDoneQuery";
import { SelectYear } from "../component/SelectYear";

function DaftarSelesai() {
  const { SearchBar } = Search;
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token && role !== "admin") {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useDoneQuery({
    variables: {
      year: selectedOption,
    },
  });

  const dataDone = useMemo(
    () => paginatedData?.pages?.flatMap((page) => page),
    [paginatedData]
  );

  console.log(dataDone);

  const handleExport = () => {
    const dataArray = dataDone?.map((d) => [
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
      d.nik_waris,
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
        "NIK Penerima (ahli waris)",
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

  const numberedData = dataDone?.map((item, index) => {
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
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 5,
            }}
          >
            <div onClick={() => editData(row.id, row.nik_alm)}>
              <ModeEditOutlineOutlined
                style={{
                  cursor: "pointer",
                  backgroundColor: "#0081CF",
                  color: "white",
                  borderRadius: 3,
                  padding: 3,
                }}
              />
            </div>

            <div onClick={() => deleteData(row.nik_alm)}>
              <DeleteOutlineOutlined
                style={{
                  cursor: "pointer",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: 3,
                  padding: 3,
                }}
              />
            </div>
          </div>
        );
      },

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

  const options = {
    paginationSize: 3,
    pageStartIndex: 1,
    // showTotal: true,
    // paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      { text: "10", value: 10, className: "my-custom-page-size" },
      { text: "25", value: 25, className: "my-custom-page-size" },
      { text: "50", value: 50, className: "my-custom-page-size" },
      { text: "100", value: 100, className: "my-custom-page-size" },
    ],
  };

  if (isError || isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <main className="body">
      <div className="datatableTitle">
        Data Pengambilan Dana Santunan Kematian Selesai Diproses
      </div>
      <ToolkitProvider
        keyField="id"
        data={numberedData}
        columns={columns}
        bootstrap4
        search
        defaultSorted={defaultSorted}
        filter={filterFactory()}
      >
        {(props) => (
          <div>
            <Row>
              <Col>
                <div className="filter">
                  <div className="search">
                    <SearchBar
                      {...props.searchProps}
                      placeholder="Search .."
                      searchPlaceholder=""
                      
                    />
                  </div>
                  <div className="year">
                    <SelectYear
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      isOptionSelected={isOptionSelected}
                      changeTextColor={changeTextColor}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
              wrapperClasses="table-responsive"
              filter={filterFactory()}
            />
          </div>
        )}
      </ToolkitProvider>
      <div className="excel">
        <button onClick={handleExport} className="export-excel">
          <span>Export to Excel</span>
        </button>
      </div>
    </main>
  );
}

export default DaftarSelesai;
