import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./headerHome.css";
import { useAuth } from "../../../hook/auth/authContext";
import { IMAGENES } from "../../../utils/assets";

function Header_home({ home }) {
  const { user, logout } = useAuth();
  const [nombre, setNombre] = useState("Cuenta");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [hashImagen, setHashImagen] = useState(Date.now());
  
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || user.name);
      setHashImagen(Date.now()); 
    } else {
      setNombre("Cuenta");
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    logout();
    navigate("/"); 
  };

  const linkStyle = { color: home ? "white" : "black" };

  const rutaImagenUsuario = user && user.imagen 
    ? `/CrudImg/Usuarios/${user.imagen}.png?t=${hashImagen}` 
    : IMAGENES.IconUser;

  return (
    <header className="header">
      <div className="header_div">
        <div className="header_div_img_div">
          <Link to="/">
            <img src={IMAGENES.LOGO.PC} alt="Logo" fetchpriority="high" />
          </Link>
        </div>

        <div className={`hamburger_menu ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>

        <div className={`header_nav_div ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/pedidos" style={linkStyle}>Pedidos</Link>
          <Link to="/AboutUs" style={linkStyle}>Sobre nosotros</Link>
          <Link to="/carta" style={linkStyle}>Nuestra carta</Link>
          {user && user.rol === "admin" && <Link to="/adminMenu" style={linkStyle}>Administracion</Link>}
          {!user && <Link to="/login" style={linkStyle}>Login</Link>}
        </div>

        {user ? (
          <div className="header_account_wrapper" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/perfil" style={{ textDecoration: 'none' }}>
              <div className="header_account_div">
                <img 
                  src={rutaImagenUsuario} 
                  alt="User" 
                  onError={(e) => e.target.src = IMAGENES.IconUser} 
                />
                <p style={{ color: 'black', margin: 0 }}>{nombre}</p>
                <button className="logout_button" onClick={handleLogout}>
                  X
                </button>
              </div>
            </Link>
          </div>
        ) : (
          <div className="header_account_placeholder"></div>
        )}
      </div>
    </header>
  );
}

export default Header_home;