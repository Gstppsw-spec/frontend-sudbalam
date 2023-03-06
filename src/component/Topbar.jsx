import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import '../style/topbar.css'

const Topbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("https://subdomain.sudbalam.com/api/user").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    fetchData();
  }, []);

  const logoutHanlder = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="header">
      <div className="pertama container">
        <table width="100%">
          <tbody>
            <tr>
              <td align="left">
                <div className="sistem">
                  SISTEM PENYALURAN SANTUNAN UANG DUKA
                </div>
              </td>
              <td>
                <ExitToAppIcon
                  style={{cursor: "pointer"}}
                  className="icon"
                  onClick={logoutHanlder}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  );
};

export default Topbar;
