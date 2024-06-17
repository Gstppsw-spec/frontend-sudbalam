import React from "react";
import profile from ".././img/balam.png";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <>
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
                <td align="right">
                  <img src={profile} style={{ height: "50px" }} alt="header img"></img>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      <div className="navigasi_bar">
        <nav>
          <ul>
            <li>
              <Link to={"/"} className="linkkuh">BERANDA</Link>
            </li>
            <li>
              <Link to="/alur-pengajuan" className="linkkuh">
                ALUR PENGAJUAN
              </Link>
            </li>
            <li>
              <Link to="/login" className="linkkuh">
                LOGIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HeaderComponent;
