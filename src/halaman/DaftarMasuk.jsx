import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import "../style/listData.css";

function DaftarMasuk() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ditolak");
  const [searchTerm, setSearchTerm] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token && role !== 'team') {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("https://subdomain.sudbalam.com/api/data",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
          item.status === "Belum di Proses" &&
          (item.kelurahan_alm.toLowerCase().includes(searchTerm.toLowerCase()) 
          || item.kecamatan_alm.toLowerCase().includes(searchTerm.toLowerCase())
          || item.nik_alm.toLowerCase().includes(searchTerm.toLowerCase())
          || item.nama_alm.toLowerCase().includes(searchTerm.toLowerCase())
          || item.alamat_alm.toLowerCase().includes(searchTerm.toLowerCase())
          || item.no_akte.toLowerCase().includes(searchTerm.toLowerCase())
          || item.nik_waris.toLowerCase().includes(searchTerm.toLowerCase())
          || item.nama_waris.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    );
  }, [items, filterStatus, searchTerm]);

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

  const handleClick = async (id) => {
    const token = localStorage.getItem('token');
    const isConfirm = await Swal.fire({
      title: "Kamu yakin?",
      text: "Data akan masuk ke data proses!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, proses data ini!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    fetch(`https://subdomain.sudbalam.com/api/data/${id}`,{
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(id))
      .catch((error) => console.error(error));
    navigate(`/dataproses`);
  };

  if (error) {
    return <div>ErrorL {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading"></div>;
  } else {
    return (
      <div className="body">
        <div className="datatableTitle">
          Data Pendaftaran Pengajuan Dana Santunan Kematian
        </div>
        <div className="cari" style={{}}>
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
                    <th className="listnih">NIK Almarhum</th>
                    <th className="listnih">Nama Almarhum</th>
                    <th className="listnih">NIK Penerima (Ahli Waris)</th>
                    <th className="listnih">Nama Penerima (Ahli Waris)</th>
                    <th className="listnih">No Akte Kematian</th>
                    <th className="listnih">Alamat</th>
                    <th className="listnih">Kelurahan</th>
                    <th className="listnih">Kecamatan</th>
                    <th className="listnih">Hari/Tanggal Meninggal</th>
                    <th className="listnih">Jam Meninggal</th>
                    <th className="listnih">Nomor Telepon</th>
                    <th className="listnih">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 &&
                    getPaginatedData(filteredData).map((row, key) => (
                      <tr key={key}>
                        <td className="listnoh" data-label="NIK Almarhum">
                          {key + 1}
                        </td>
                        <td className="listnoh" data-label="NIK Almarhum">
                          {row.nik_alm}
                        </td>
                        <td className="listnoh" data-label="Nama Almarhum">
                          {row.nama_alm}
                        </td>
                        <td
                          className="listnoh"
                          data-label="NIK Penerima (Ahli Waris)"
                        >
                          {row.nik_waris}
                        </td>
                        <td
                          className="listnoh"
                          data-label="Nama Penerima (Ahli Waris)"
                        >
                          {row.nama_waris}
                        </td>
                        <td
                          className="listnoh"
                          data-label="Nomor Akte Kematian"
                        >
                          {row.no_akte}
                        </td>
                        <td className="listnoh" data-label="Alamat">
                          {row.alamat_alm}
                        </td>
                        <td className="listnoh" data-label="Kelurahan">
                          {row.kelurahan_alm}
                        </td>

                        <td className="listnoh" data-label="Kecamatan">
                          {row.kecamatan_alm}
                        </td>

                        <td
                          className="listnoh"
                          data-label="Hari/Tanggal Meninggal"
                        >
                          {row.tgl_alm}
                        </td>

                        <td className="listnoh" data-label="Jam Meninggal">
                          {row.jam_alm}
                        </td>

                        <td className="listnoh" data-label="Nomor Telepon">
                          {row.tlpn_waris}
                        </td>

                        <td className="listnoh" data-label="Action">
                          <div className="action">
                            <div className="editdong">
                              <button onClick={() => handleClick(row.id)} className="button">
                                PROSES
                              </button>
                            </div>
                          </div>
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

export default DaftarMasuk;

