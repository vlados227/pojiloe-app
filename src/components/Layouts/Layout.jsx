import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../App.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/user" className="navbar-link">Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="navbar-link">Register</Link>
        </li>
        <li className="navbar-item">
          <Link to="/excursions/all" className="navbar-link">Excursions</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/manage-excursions" className="navbar-link">Admin</Link>
        </li>
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