import React, { useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../style/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
   
    await axios
      .post("https://subdomain.sudbalam.com/api/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/kematian");
        }
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="background">
      <div className="loginContainer">
        {validation.message && (
          <div className="alert alert-danger">{validation.message}</div>
        )}
        <form onSubmit={loginHandler} className="kosong">
          <h4>HALAMAN LOGIN</h4>
          <br />
          <hr />
          <br />
          <label>ALAMAT EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input nihLogin"
          />
          {validation.email && (
            <div className="alert alert-danger">{validation.email[0]}</div>
          )}
          <br />
          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input nihLogin"
          />
          {validation.password && (
            <div className="alert alert-danger">{validation.password[0]}</div>
          )}
          
          <button className="button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
