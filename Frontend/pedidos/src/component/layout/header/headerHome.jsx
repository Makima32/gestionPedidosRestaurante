import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./headerHome.css";
import { useAuth } from "../../../hook/auth/authContext";

function Header_home({ home }) {
  const { user, logout } = useAuth(); 
  const [nombre, setNombre] = useState("Cuenta");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) setNombre(user.name);
    else setNombre("Cuenta");
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => logout();

  const linkStyle = { color: home ? "white" : "black" };

  return (
    <header className="header">
      <div className="header_div">
        <div className="header_div_img_div">
          <Link to="/"><img src="logo.webp" alt="Logo" /></Link>
        </div>

        <div className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/pedidos" style={linkStyle}>Pedidos</Link>
          <Link to="/AboutUs" style={linkStyle}>Sobre nosotros</Link>
          <Link to="/carta" style={linkStyle}>Nuestra carta</Link>
          
          {user && user.rol === "admin" && (
            <Link to="/adminMenu" style={linkStyle}>Administracion</Link>
          )}
          {!user && (
            <Link to="/login" style={linkStyle}>Login</Link>
          )}
        </div>

        {/* Sección de cuenta: Solo si hay usuario */}
        {user ? (
          <div className="header_account_div">
            <img src="gatoweee.jpeg" alt="User" />
            <p>{nombre}</p>
            <button className="logout_button" onClick={handleLogout}>X</button>
          </div>
        ) : (
          <div className="header_account_placeholder"></div>
        )}
      </div>
    </header>
  );
}

export default Header_home;