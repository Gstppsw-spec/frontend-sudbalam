import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/dashboard.css";
import "../style/beranda.css";
import "../style/home.css";

function Navbar() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const handleClick = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  }, []);
  return (
    // <div className="navigasi_bar n-admin">
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/dashboard" className="linkkuh dash">
    //           DASHBOARD
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/dataselesai" className="linkkuh dash">
    //         DATA SELESAI
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/datapembayaran" className="linkkuh dash">
    //         DATA PEMBAYARAN
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/datatolak" className="linkkuh dash">
    //         DATA TOLAK
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
    <div className="navigasi_bar n-admin">
      <nav>
        <ul>
          {token == null ? (
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
