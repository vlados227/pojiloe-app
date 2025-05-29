import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../App.css"; 
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [navmode, setNavmode] = useState();

  
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
            <Link to="/login" className="navbar-link">
              Войти
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">
              Регистрация
            </Link>
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
        <Link to="/login" className="navbar-link">
          Войти
        </Link>
        </li>
        <li className="navbar-item">
        <Link to="/register" className="navbar-link">
          Регистрация
        </Link>
        </li>
        <li className="navbar-item admin-link">
        <Link to="/admin" className="navbar-link">
          <span style={{ fontWeight: "bold", color: "#d32f2f" }}>Админ панель</span>
        </Link>
        </li>
      </ul>
      </nav>
    );
  }

  const navbars = [unauthNavbar(), userNavbar(), adminNavbar()];

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.role);
        } catch (error) {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
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