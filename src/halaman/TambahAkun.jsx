import React, { useState } from "react";
import "../style/pengajuan.css";
import { useNavigate} from "react-router";
import Swal from "sweetalert2";
import Navbar from "../component/Navbar";
import Topbar from "../component/Topbar";
import axios from "axios";

function TambahAkun() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const createProduct = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    await axios
      .post(`https://subdomain.sudbalam.com/api/register`,formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } )
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <main className="body">
        <h5 className="judul-pengajuan">
          Silahkan isi form berikut untuk menambahkan akun
        </h5>
        <form className="form-pengajuan" onSubmit={createProduct}>
          <div className="form_pertama">
            <div className="form-group">
              <label htmlFor="nama">Email</label>
              <input
              className="input"
              placeholder="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Password</label>
              <input
              className="input"
              placeholder="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nama">Role</label>
              <select
              className="input"
                value={role}
                type="text"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              >
                <option value="defaultValue">Pilih role</option>
                <option value="admin">Admin</option>
                <option value="team">Team</option>
              </select>
            </div>
          </div>
          <button type="submit" className="button">
            TAMBAH
          </button>
        </form>
      </main>

      <div className="footer fixed-bottom">
        <div className="container">
          <div align="center">
            <small>Sistem Penyaluran Dana Santunan Kematian &copy; 2024</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahAkun;

