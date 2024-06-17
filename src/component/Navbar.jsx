import React from "react";
import { Link} from "react-router-dom";
import "../style/dashboard.css";
import "../style/beranda.css";
import "../style/home.css";

function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <div className="navigasi_bar n-admin">
      <nav>
        <ul>
          {token !== null ? (
            <>
              <li>
                <Link to="/dashboard" className="linkkuh dash">
                  DASHBOARD
                </Link>
              </li>
              <li>
                <Link to="/dataselesai" className="linkkuh dash">
                  DATA SELESAI
                </Link>
              </li>
              <li>
                <Link to="/datapembayaran" className="linkkuh dash">
                  DATA PEMBAYARAN
                </Link>
              </li>
              <li>
                <Link to="/datatolak" className="linkkuh dash">
                  DATA TOLAK
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
