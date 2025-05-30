import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../../App.css"; 
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const navigate  = useNavigate();
  const { role, updateRole, setRole } = useAuth();
  const [navmode, setNavmode] = useState();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
    navigate('/')
  };
  
  const unauthNavbar = () => {
    return ( <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  Главная
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Регистрация
                </Link>
              </li>
            </ul>
          </nav>)
      }


  const userNavbar = () => {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Главная
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="navbar-link">
              Профиль
            </Link>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={handleLogout} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#1976d2'}}>
              Выйти
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  const adminNavbar = () => {
    return (
      <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
        <Link to="/" className="navbar-link">
          Главная
        </Link>
        </li>
        <li className="navbar-item">
        <Link to="/user" className="navbar-link">
          Профиль
        </Link>
        </li>
        <li className="navbar-item">
        <Link className='navbar-link' to="/admin/manage-excursions">
          Управление экскурсиями
        </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/admin/add-excursion">
            Добавить экскурсию
          </Link>
        </li>
        <li className="navbar-item">
          <button className="navbar-link" onClick={handleLogout} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
            Выйти
          </button>
        </li>
      </ul>
      </nav>
    );
  }

  const navbars = [unauthNavbar(), userNavbar(), adminNavbar()];

  useEffect(() => {
    updateRole();
  }, []);

  useEffect(() => {
    switch (role) {
      case 'user':
        setNavmode(1);
        break;
      case 'admin':
        setNavmode(2);
        break;
      default:
        setNavmode(0);
    }
  }, [role]);

  return navbars[navmode]
  
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