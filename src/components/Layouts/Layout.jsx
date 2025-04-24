import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../App.css"; 
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role)
      } catch (error) {
        alert("нет доступа")
      }
    }
  }, [])

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Главная</Link>
        </li>
        <li className="navbar-item">
          <Link to="/user" className="navbar-link">Профиль</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Войти</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">Регистрация</Link>
        </li>
        {/* <li className="navbar-item">
           <Link to="/excursions/all" className="navbar-link">Excursions</Link> 
        </li> */}
        {
          role == "admin" && (
            <li className="navbar-item">
              <Link to="/admin/manage-excursions" className="navbar-link">Admin panel</Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
};

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;