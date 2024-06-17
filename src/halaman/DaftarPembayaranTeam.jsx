import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../style/listData.css";

function DaftarPembayaranTeam() {
  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    setFilteredData(
      items.filter(
        (item) =>
          item.nama_alm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nik_alm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nama_waris.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nik_waris.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.no_bkp.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tlg_pembayaran.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm]);

  let dataLimit = 100;
  let pageLimit = 5;

  const [pages, setPages] = useState(
    Math.ceil(filteredData.length / dataLimit)
  );
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    if (currentPage < pages) {
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviosPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return filteredData.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    if (pages > 0) {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      let end = Math.min(start + pageLimit, pages);
      return new Array(end - start).fill().map((_, idx) => start + idx + 1);
    } else {
      return [];
    }
  };

  useEffect(() => {
    setPages(Math.ceil(filteredData.length / dataLimit));
  }, [filteredData, dataLimit]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  if (error) {
    return <div>ErrorL {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <div className="body">
        <div className="datatableTitle">
          Bukti Pembayaran Pengajuan Dana Santunan Kematian
        </div>
        <div className="cari">
          <input
            type="search"
            className="input"
            name="search-form"
            id="search-form"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <div>
            <div>
              <table className="list-data">
                <thead>
                  <tr className="hidden">
                    <th className="listnih">No</th>
                    <th className="listnih">Nomor BKP</th>
                    <th className="listnih">NIK Almarhum</th>
                    <th className="listnih">Nama Almarhum</th>
                    <th className="listnih">Nama Penerima (Ahli Waris)</th>
                    <th className="listnih">Besar Bantuan</th>
                    <th className="listnih">Tanggal Pembayaran</th>
                    <th className="listnih">Bukti Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 &&
                    getPaginatedData(filteredData).map((row, key) => (
                      <tr key={key}>
                        <td className="listnoh" data-label="Nomor BKP">
                          {key + 1}
                        </td>
                        <td className="listnoh" data-label="Nomor BKP">
                          {row.no_bkp}
                        </td>
                        <td className="listnoh" data-label="NIK Almarhum">
                          {row.nik_alm}
                        </td>
                        <td className="listnoh" data-label="NIK Almarhum">
                          {row.nama_alm}
                        </td>
                        <td className="listnoh" data-label="Nama Penerima">
                          {row.nama_waris}
                        </td>
                        <td className="listnoh" data-label="Besar Bantuan">
                          {row.bantuan}
                        </td>
                        <td className="listnoh" data-label="Tanggal Pembayaran">
                          {row.tlg_pembayaran}
                        </td>
                        <td className="listnoh" data-label="Bukti Pembayaran">
                          <img
                            className="gambarPembayaran"
                            key={key}
                            src={`https://subdomain.sudbalam.com/gambar/${row.gambar}`}
                            alt="bukti pembayaran"
                            onClick={() => {
                              setCurrentImage(
                                `https://subdomain.sudbalam.com/gambar/${row.gambar}`
                              );
                              setShowImage(true);
                            }}
                            width="50px"
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
                                src={currentImage}
                                style={{ maxWidth: "90%", maxHeight: "90%" }}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="pagi">
              {currentPage > 1 && <a onClick={goToPreviosPage}>Prev</a>}
              {getPaginationGroup().map((item, index) => (
                <a
                  key={index}
                  onClick={changePage}
                  className={`paginationItem ${
                    currentPage === item ? "active" : null
                  }`}
                >
                  <span>{item}</span>
                </a>
              ))}
              {currentPage < pages && <a onClick={goToNextPage}>Next</a>}
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default DaftarPembayaranTeam;
