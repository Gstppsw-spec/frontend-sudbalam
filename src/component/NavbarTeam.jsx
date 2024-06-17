import React from "react";
import { Link } from "react-router-dom";
import "../style/dashboard.css";
import "../style/beranda.css";
import "../style/home.css";

function NavbarTeam() {

  return (
    <div className="navigasi_bar n-team">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/kematian" className="linkkuh">
                DATA MASUK
              </Link>
            </li>

            <li>
              <Link to="/dataproses" className="linkkuh">
                DATA DIPROSES
              </Link>
            </li>
            <li>
              <Link to="/datapembayaranTeam" className="linkkuh">
                DATA PEMBAYARAN
              </Link>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default NavbarTeam;
