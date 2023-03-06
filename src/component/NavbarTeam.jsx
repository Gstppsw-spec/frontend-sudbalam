import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/dashboard.css";
import "../style/beranda.css";
import "../style/home.css";

function NavbarTeam() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const handleClick = () => {
    setShowNav(!showNav);
  };
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
      {/* )} */}
    </div>
  );
}

export default NavbarTeam;
