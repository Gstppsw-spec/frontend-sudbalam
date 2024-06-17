import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import "../style/home.css";
import Widget from "./Widget";
import "../style/beranda.css";
import { Link } from "react-router-dom";
import axios from "axios";
import remove from "../img/remove.png";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token && role !== 'admin') {
      navigate('/login');
      return;
    }
  }, [ navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://subdomain.sudbalam.com/api/user", {
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
        }
      );
  }, [ navigate]);

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    await axios
      .delete(`https://subdomain.sudbalam.com/api/user/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        // fetchProducts();
        navigate("/dashboard");
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };
  if(!isLoaded){
    return (
    <div className="app-container">
      <Topbar/>
      <Navbar/>
      <div className="loading"></div>;
    </div>
    );
  }
  else{
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <main className="body-dashboard-satu">
        <div className="body-widget">
          <Widget type="jumlah_kematian" />
          <Widget type="anggaran_kematian" />
          <Widget type="kematian_tahun" />
          <Widget type="kematian_bulan" />
          <Widget type="kematian_Hari" />
        </div>
        <div className="tabel-pengguna">
          <div>
            <Link className="link-penambahan" to="/dashboard/tambahaccount">
              <span className="tambah-akun">Tambah Account</span>
            </Link>
          </div>
          <div>
            <table className="list-user">
              <thead>
                <tr className="toh">
                  <th className="lis">#</th>
                  <th className="lis">Email</th>
                  <th className="lis">Role</th>
                  <th className="lis">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {items.length &&
                  items.map((row, key) => (
                    <tr key={key} className="toh">
                      <td className="loh">{key + 1}</td>
                      <td className="loh">{row.email}</td>
                      <td className="loh">{row.role}</td>
                      <td className="loh">
                        <div className="action">
                          <div className="editdong">
                            <div
                              onClick={() => deleteProduct(row.id)}
                              className="hapus"
                            >
                              <img src={remove} width="25px" alt="remove" className="silang"/>
                              <span id="hapus">Hapus</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <br />
      <br />
      <footer className="footer">
        Sistem Penyaluran Dana Santunan Kematian &copy; 2024
      </footer>
    </div>
  );
};
}

export default Home;
