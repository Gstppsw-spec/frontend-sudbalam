import { useNavigate } from "react-router";
import "../style/listData.css";
import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState} from "react";
import { Row, Col} from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Swal from "sweetalert2";
import { usePaymentQuery } from "../api/pembayaran/usePaymentQuery";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { SelectYear } from "../component/SelectYear";

function DaftarPembayaran(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { SearchBar } = Search;
  const navigate = useNavigate();
  const baseImage = process.env.BASE_IMAGE

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const {
    data: paginatedData,
    isLoading,
    isError,
  } = usePaymentQuery();

  const data = useMemo(
    () => paginatedData?.pages?.flatMap((page) => page),
    [paginatedData]
  );

  

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
  };

  const onSeeImage = (gambar) => {
    setShowImage(true);
    setCurrentImage(`${baseImage}/${gambar}`);
  };

  const getNumber = (index) => {
    return index + 1;
  };

  const numberedData = data?.map((item, index) => {
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
        fontWeight: "bold",
        fontSize: "10px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        cursor: "pointer",
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
      dataField: "bantuan",
      text: "Besar Bantuan",
      sort: true,
      style: {
        fontSize: "10px",
        textAlign: "center",
      },
      formatter: (cell, row) => {
        // Mengonversi nilai ke dalam format mata uang lokal
        const formattedValue = parseFloat(cell).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 2,
        });

        return (
          <div style={{ fontSize: "10px", textAlign: "center" }}>
            {formattedValue}
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

    {
      dataField: "tlg_pembayaran",
      text: "Tanggal Pembayaran",
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
      dataField: "link",
      text: "Tindakan",
      style: {
        fontSize: "10px",
        textAlign: "center",
        flexDirection: "row",
     
      },

      formatter: (rowContent, row) => {
        return (
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 5
            }}
          >
            <div onClick={() => editData(row.id, row.nik_alm)}>
              <ModeEditOutlineOutlinedIcon
                color="success"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#0081CF",
                  color: "white",
                  borderRadius: 3,
                  padding: 3
                }}
              />
            </div>
            <div>
              <RemoveRedEyeOutlinedIcon
                color="primary"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#0081CF",
                  color: "white",
                  borderRadius: 3,
                  padding: 3
                }}
                onClick={() => onSeeImage(row.gambar)}
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

    sizePerPageList: [
      { text: "10", value: 10, className: "my-custom-page-size" },
      { text: "25", value: 25, className: "my-custom-page-size" },
      { text: "50", value: 50, className: "my-custom-page-size" },
      { text: "100", value: 100, className: "my-custom-page-size" },
    ],
  };

  if (isError) {
    return <div>Error</div>;
  } else if (isLoading) {
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="float-right">
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search .."
                        searchPlaceholder=""
                      />
                    </div>
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
              src={currentImage}
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </div>
        )}
      </main>
    );
  }
}

export default DaftarPembayaran;
