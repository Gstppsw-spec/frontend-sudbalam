import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import '../style/topbar.css'

const Topbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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
